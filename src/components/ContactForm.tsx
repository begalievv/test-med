import React, { useState } from 'react';
import { UserData } from '../types';
import './ContactForm.css';

interface ContactFormProps {
  onSubmit: (data: UserData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: '+996',
    telegram: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очистка ошибки при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите ваш email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите ваш номер телефона';
    } else if (!/^\+996[0-9]{9}$/.test(formData.phone)) {
      newErrors.phone = 'Пожалуйста, укажите корректный номер (9 цифр после кода +996)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="contact-form-page">
      <div className="contact-card">
        <h2>Ваши результаты почти готовы!</h2>
        <p className="contact-description">
          Чтобы получить подробный отчет с результатами теста, пожалуйста,
          заполните следующую информацию:
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ваше имя <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Иван Иванов"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Ваш email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="example@mail.ru"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Ваш номер телефона <span className="required">*</span></label>
            <div className="phone-input-container">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
                placeholder="XXXXXXXXX"
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="telegram">Ваш Telegram аккаунт (необязательно)</label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="@username"
            />
          </div>
          
          {/* <div className="privacy-notice">
            Нажимая кнопку "Получить результаты", вы соглашаетесь с нашей 
            <a href="#"> политикой конфиденциальности</a>.
          </div> */}
          
          <button type="submit" className="submit-button">
            Получить результаты
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;