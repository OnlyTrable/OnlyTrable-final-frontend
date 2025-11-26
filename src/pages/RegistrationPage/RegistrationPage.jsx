import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../components/Input/Input';
import styles from './RegistrationPage.module.css';

const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    fullName: yup.string().required('Full Name is required'),
    username: yup.string().min(4, 'Username must be at least 4 characters').required('Username is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegistrationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        // Тут буде логіка валідації та відправки даних на бекенд
        // Валідація вже виконана автоматично!
        console.log('Form data submitted:', data);
    };

    return (
        <div className={styles.pageWrapper}>
            {/* handleSubmit з react-hook-form огортає нашу функцію onSubmit */}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h1>Create an Account</h1>
                {/* 
                  Ми використовуємо оператор '...' для передачі всіх потрібних пропсів (name, onChange, onBlur, ref)
                  в наш компонент Input. Помилки тепер беруться з об'єкта errors від useForm.
                */}
                <Input {...register("email")} type="email" error={errors.email?.message} placeholder="Email" />
                <Input {...register("fullName")} error={errors.fullName?.message} placeholder="Full Name" />
                <Input {...register("username")} error={errors.username?.message} placeholder="Username" />
                <Input {...register("password")} type="password" error={errors.password?.message} placeholder="Password" />
                <button type="submit" className={styles.submitButton}>Sign Up</button>
            </form>
        </div>
    );
};

export default RegistrationPage;