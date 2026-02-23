import React from 'react';
import './index.scss';

const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="loader-spinner">
                    <div className="spinner-circle"></div>
                    <div className="spinner-circle inner"></div>
                </div>
                <div className="loader-text">
                    <span>D</span>
                    <span>o</span>
                    <span>w</span>
                    <span>n</span>
                    <span>l</span>
                    <span>o</span>
                    <span>a</span>
                    <span>d</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </div>
                <div className="loader-progress">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;