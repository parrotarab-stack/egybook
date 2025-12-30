-- جدول المحافظات المصرية الـ27
CREATE TABLE IF NOT EXISTS provinces (
    id VARCHAR(50) PRIMARY KEY,
    name_ar VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    governor VARCHAR(100),
    population INTEGER,
    area_km2 DECIMAL(10,2),
    capital VARCHAR(100),
    phone_code VARCHAR(10),
    description TEXT,
    features JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المستخدمين (بنظام الهوية المصري)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    national_id VARCHAR(14) UNIQUE NOT NULL,
    full_name_ar VARCHAR(200) NOT NULL,
    full_name_en VARCHAR(200),
    birth_date DATE NOT NULL,
    gender VARCHAR(10),
    province_id VARCHAR(50) REFERENCES provinces(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    
    -- بيانات الهوية
    id_card_front_url TEXT,
    id_card_back_url TEXT,
    selfie_url TEXT,
    verification_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, rejected
    verified_at TIMESTAMP,
    
    -- الإعدادات
    is_active BOOLEAN DEFAULT true,
    is_banned BOOLEAN DEFAULT false,
    role VARCHAR(20) DEFAULT 'user', -- user, moderator, admin, super_admin
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المجتمعات
CREATE TABLE IF NOT EXISTS communities (
    id SERIAL PRIMARY KEY,
    name_ar VARCHAR(200) NOT NULL,
    name_en VARCHAR(200),
    description TEXT,
    province_id VARCHAR(50) REFERENCES provinces(id),
    category VARCHAR(50), -- tourism, business, education, etc.
    is_public BOOLEAN DEFAULT true,
    is_official BOOLEAN DEFAULT false,
    member_count INTEGER DEFAULT 0,
    moderator_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المنشورات
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    community_id INTEGER REFERENCES communities(id),
    province_id VARCHAR(50) REFERENCES provinces(id),
    content TEXT NOT NULL,
    media_urls JSONB DEFAULT '[]',
    type VARCHAR(20) DEFAULT 'text', -- text, image, video, poll
    is_promoted BOOLEAN DEFAULT false,
    promotion_provinces JSONB DEFAULT '[]',
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_hidden BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الإعلانات المدفوعة
CREATE TABLE IF NOT EXISTS ads (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url TEXT,
    target_provinces JSONB DEFAULT '[]', -- جميع المحافظات أو محافظات محددة
    target_type VARCHAR(20) DEFAULT 'all', -- all, specific
    budget DECIMAL(10,2) NOT NULL,
    spent DECIMAL(10,2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- pending, active, completed, rejected
    start_date DATE,
    end_date DATE,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المعاملات المالية
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'EGP',
    type VARCHAR(50), -- ad_payment, subscription, refund, etc.
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_gateway VARCHAR(50),
    gateway_reference VARCHAR(255),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول تقارير المخالفات
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    target_type VARCHAR(50), -- user, post, comment, community
    target_id INTEGER NOT NULL,
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    evidence JSONB DEFAULT '[]', -- صور أو روابط
    status VARCHAR(20) DEFAULT 'pending',
    assigned_to INTEGER REFERENCES users(id),
    resolution TEXT,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول سجل الطوارئ
CREATE TABLE IF NOT EXISTS emergency_logs (
    id SERIAL PRIMARY KEY,
    action_type VARCHAR(100) NOT NULL, -- shutdown, lockdown, alert, etc.
    initiated_by INTEGER REFERENCES users(id),
    reason TEXT NOT NULL,
    affected_scope VARCHAR(50), -- all, province, user_group
    affected_ids JSONB DEFAULT '[]',
    duration_minutes INTEGER,
    status VARCHAR(20) DEFAULT 'active',
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);