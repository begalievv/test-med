import React, { useState } from 'react';
import { UserData, ContactFormContent } from '../types';
import './ContactForm.css';

interface ContactFormProps {
  onSubmit: (data: UserData) => void;
  content?: ContactFormContent; // Dynamic content from Google Sheets
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  onSubmit, 
  content 
}) => {
  // Default content if not provided via props
  const defaultContent: ContactFormContent = {
    title: 'Ваши результаты почти готовы!',
    description: 'Чтобы получить подробный отчет с результатами теста, пожалуйста, заполните следующую информацию:',
    nameLabel: 'Ваше имя',
    emailLabel: 'Ваш email',
    phoneLabel: 'Ваш номер телефона',
    telegramLabel: 'Ваш Telegram аккаунт (необязательно)',
    buttonText: 'Получить результаты',
    requiredText: '*',
    validationMessages: {
      nameRequired: 'Пожалуйста, укажите ваше имя',
      emailRequired: 'Пожалуйста, укажите ваш email',
      emailInvalid: 'Пожалуйста, укажите корректный email',
      phoneRequired: 'Пожалуйста, укажите ваш номер телефона',
      phoneInvalid: 'Пожалуйста, укажите корректный номер (9 цифр после кода +996)'
    }
  };

  // Use provided content or default
  const formContent = content || defaultContent;

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
    
    // Clear error when user types
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
      newErrors.name = formContent.validationMessages.nameRequired;
    }
    
    // if (!formData.email.trim()) {
    //   newErrors.email = formContent.validationMessages.emailRequired;
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   newErrors.email = formContent.validationMessages.emailInvalid;
    // }
    
    // if (!formData.phone.trim()) {
    //   newErrors.phone = formContent.validationMessages.phoneRequired;
    // } else if (!/^\+996[0-9]{9}$/.test(formData.phone)) {
    //   newErrors.phone = formContent.validationMessages.phoneInvalid;
    // }
    
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
        <h2>{formContent.title}</h2>
        <p className="contact-description">
          {formContent.description}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{formContent.nameLabel} <span className="required">{formContent.requiredText}</span></label>
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
          
          {/* <div className="form-group">
            <label htmlFor="email">{formContent.emailLabel} <span className="required">{formContent.requiredText}</span></label>
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
          </div> */}
          
          {/* <div className="form-group">
            <label htmlFor="phone">{formContent.phoneLabel} <span className="required">{formContent.requiredText}</span></label>
            <div className="phone-input-container">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
                placeholder="+996XXXXXXXXX"
              />
            </div>
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div> */}
          
          {/* <div className="form-group">
            <label htmlFor="telegram">{formContent.telegramLabel}</label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="@username"
            />
          </div> */}
          
          <button type="submit" className="submit-button">
            {formContent.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;