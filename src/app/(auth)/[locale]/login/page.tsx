'use client'

import { useActionState } from 'react';

import Input from '@/components/shared/input';
import Button from '@/components/shared/button/Button';
import SectionBackground from '@/components/admin/general/sectionBackground';

import {
    loginAction,
    type LoginActionState
} from '@/app/actions/auth/login'

import styles from './index.module.scss';



const initialState: LoginActionState = {
    success: false,
    error: ''
}

export default function LoginForm() {
    const [state, action, isPending] = useActionState(
        loginAction,
        initialState
    )

    return (
        <main className={`${styles.main} container`}>
            <SectionBackground className={styles.formWrapper}>

                <form action={action}>
                    {state.error && (
                        <p className={styles.error} role="error">
                            ⚠️ {state.error}
                        </p>
                    )}

                    <div className={styles.inputWrapper}>
                        <Input 
                            placeholder="Email"
                            name="email"
                            type="text"
                            iconPosition="noIcon"
                            maxLen={50}
                            variant="admin"
                            adminLabel="withLabel"
                            label="Email"
                            additionalClass={styles.input}
                            noize={true}
                        />

                        <Input 
                            placeholder="Password"
                            name="password"
                            type="password"
                            iconPosition="noIcon"
                            maxLen={50}
                            variant="admin"
                            adminLabel="withLabel"
                            label="Password"
                            additionalClass={styles.input}
                            noize={true}
                        />
                    </div>
                    

                    <Button 
                        behavior={isPending ? "loading" : "default"}
                        variant="black"
                        type="submit"
                        text="Sign in"
                        additionalClass={styles.submitBtn}
                        noize={true}
                        iconPosition="noIcon"
                    />
                </form>
            </SectionBackground>
        </main>
        
    )
}