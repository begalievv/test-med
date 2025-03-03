import React, { useState } from 'react';
import { UserData } from '../types';
import './ContactForm.css';

interface ContactFormProps {
  onSubmit: (data: UserData) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
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
    } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите ваш email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
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
            <label htmlFor="name">Ваше имя</label>
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
            <label htmlFor="email">Ваш email</label>
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
          
          <div className="privacy-notice">
            Нажимая кнопку "Получить результаты", вы соглашаетесь с нашей 
            <a href="#"> политикой конфиденциальности</a>.
          </div>
          
          <button type="submit" className="submit-button">
            Получить результаты
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;