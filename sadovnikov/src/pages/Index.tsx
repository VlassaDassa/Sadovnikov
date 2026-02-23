import React, { useEffect } from 'react';

import Preview from '../components/Preview';
import Skills from '../components/Skills';
import Stack from '../components/Stack';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer';

import AnimatedSection from '../components/AnimatedScroll';
import Loader from '../components/Loader';
import { useLoading } from '../hooks/useLoading';

import './index.scss';




const Index: React.FC = () => {
    const { loading } = useLoading();

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loading]);

    return (
        <>
            {loading && <Loader />}
            <main className="main" style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <AnimatedSection animation="fade-up" delay={0}>
                    <Preview />
                </AnimatedSection>
                
                <AnimatedSection animation="fade-left" delay={200}>
                    <Skills />
                </AnimatedSection>
                
                <AnimatedSection animation="zoom" delay={200}>
                    <Stack />
                </AnimatedSection>
                
                <AnimatedSection animation="fade-right" delay={200}>
                    <About />
                </AnimatedSection>
                
                <AnimatedSection animation="zoom" delay={200}>
                    <Portfolio />
                </AnimatedSection>
                
                <AnimatedSection animation="fade-up" delay={200}>
                    <Contacts />
                </AnimatedSection>
                
                <AnimatedSection animation="fade-down" delay={200}>
                    <Footer />
                </AnimatedSection>
            </main>
        </>
    );
};

export default Index;