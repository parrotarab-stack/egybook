import express from 'express';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تكوين قاعدة البيانات
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/egybook.db',
  logging: false
});

// نموذج المستخدم
interface UserAttributes {
  id: number;
  national_id: string;
  full_name_ar: string;
  birth_date: string;
  province: string;
  email: string;
  password_hash: string;
  verification_status: string;
}

// نموذج المحافظة
interface ProvinceAttributes {
  id: string;
  name_ar: string;
  name_en: string;
  governor: string;
  population: number;
}

// بيانات المحافظات المؤقتة
const provincesData: ProvinceAttributes[] = [
  {
    id: 'cairo',
    name_ar: 'القاهرة',
    name_en: 'Cairo',
    governor: 'خالد عبد العال',
    population: 9992000
  },
  {
    id: 'alexandria',
    name_ar: 'الإسكندرية',
    name_en: 'Alexandria',
    governor: 'محمد الشريف',
    population: 5162000
  },
  // ... يمكن إضافة بقية المحافظات
];

// مسارات API

// 1. الحصول على جميع المحافظات
app.get('/api/provinces', (req, res) => {
  res.json({
    success: true,
    count: provincesData.length,
    data: provincesData
  });
});

// 2. إضافة محافظة جديدة
app.post('/api/provinces', (req, res) => {
  const province = req.body;
  provincesData.push(province);
  
  io.emit('province_added', province);
  
  res.json({
    success: true,
    message: 'تمت إضافة المحافظة بنجاح',
    data: province
  });
});

// 3. تسجيل الدخول كمسؤول
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'ilperata' && password === 'admin123') {
    const token = jwt.sign(
      { 
        username, 
        role: 'super_admin',
        email: 'ilperata@msn.com'
      },
      'egybook_secret_key_2024',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        username,
        email: 'ilperata@msn.com',
        role: 'super_admin'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'اسم المستخدم أو كلمة المرور غير صحيحة'
    });
  }
});

// 4. نظام الهوية - تسجيل مستخدم جديد
app.post('/api/users/register', async (req, res) => {
  const {
    national_id,
    full_name_ar,
    birth_date,
    province,
    email,
    password
  } = req.body;
  
  try {
    // التحقق من الرقم القومي (14 رقم)
    if (!/^\d{14}$/.test(national_id)) {
      return res.status(400).json({
        success: false,
        message: 'الرقم القومي يجب أن يكون 14 رقماً'
      });
    }
    
    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      national_id,
      full_name_ar,
      birth_date,
      province,
      email,
      password_hash: hashedPassword,
      verification_status: 'pending',
      created_at: new Date()
    };
    
    // هنا يتم حفظ المستخدم في قاعدة البيانات
    // مؤقتاً: نرجع البيانات فقط
    
    res.json({
      success: true,
      message: 'تم استلام بيانات التسجيل، يرجى رفع صور الهوية',
      data: {
        user_id: Date.now(), // مؤقت
        verification_step: 'upload_id'
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'حدث خطأ أثناء التسجيل'
    });
  }
});

// 5. رفع صور الهوية
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

app.post('/api/users/upload-id', upload.array('files', 3), (req, res) => {
  // هنا يتم معالجة الصور وتحقق من الهوية
  // مؤقتاً: نرجع نجاح
  res.json({
    success: true,
    message: 'تم استلام صور الهوية، جاري التحقق',
    verification_status: 'under_review'
  });
});

// 6. نظام الطوارئ
app.post('/api/emergency/shutdown', (req, res) => {
  const { reason, duration, scope } = req.body;
  
  // إرسال إشعار لجميع المستخدمين المتصلين
  io.emit('emergency_shutdown', {
    reason,
    duration,
    scope,
    timestamp: new Date()
  });
  
  res.json({
    success: true,
    message: 'تم تفعيل وضع الطوارئ',
    action: 'shutdown'
  });
});

// 7. نظام الترويج المدفوع
app.post('/api/ads/create', (req, res) => {
  const {
    user_id,
    title,
    description,
    target_provinces,
    budget,
    duration_days
  } = req.body;
  
  // حساب السعر حسب المرحلة
  const calculatePrice = () => {
    // Phase 1: أسعار رمزية
    const basePrice = 5; // جنيه للمحافظة
    return target_provinces.length * basePrice;
  };
  
  const totalPrice = calculatePrice();
  
  res.json({
    success: true,
    message: 'تم إنشاء الإعلان بنجاح',
    data: {
      ad_id: Date.now(),
      title,
      target_provinces,
      budget: totalPrice,
      status: 'pending_payment'
    }
  });
});

// WebSocket للاتصال الحي
io.on('connection', (socket) => {
  console.log('مستخدم متصل:', socket.id);
  
  socket.on('admin_action', (data) => {
    // بث إجراءات المشرف للمستخدمين الآخرين
    io.emit('admin_notification', data);
  });
  
  socket.on('disconnect', () => {
    console.log('مستخدم انقطع:', socket.id);
  });
});

// بدء الخادم
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على: http://localhost:${PORT}`);
  console.log(`📊 لوحة التحكم: http://localhost:3000/admin`);
});