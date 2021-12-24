import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';

export default function Modal() {

    var isVisibleModal = window.localStorage.getItem("isVisibleModal");
    const [isVisible, setIsVisible] = useState(isVisibleModal == null ? 'true' : isVisibleModal);

    useEffect(() => {
        function visibibleModal() {
            window.localStorage.setItem("isVisibleModal", isVisible);
        }

        visibibleModal();
    }, [isVisible])

    function closeModal() {
        setIsVisible('false');
    }

    return (
        <div className={styles.app} style={{ 'display': isVisible == 'false' ? 'none' : 'block' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleHeader}>
                        <span>Lorem Ipsum Changed</span>
                    </div>
                    <div className={styles.closeHeader} onClick={() => closeModal()}>
                        <img src={require('../../images/close.png')} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.sideLeft}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan eu sapien vitae semper. Duis scelerisque mi egestas varius vehicula. Curabitur vel pretium enim, quis aliquam orci. Quisque egestas justo congue, convallis urna ut, tristique libero. In vel faucibus felis, eget tempus quam. Donec iaculis turpis ut felis aliquet ullamcorper at vel sem. Donec mattis sollicitudin turpis eu placerat. Aliquam condimentum sodales sapien et consequat. In hac habitasse platea dictumst.</p>
                    </div>
                    <div className={styles.sideRight}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin accumsan eu sapien vitae semper. Duis scelerisque mi egestas varius vehicula. Curabitur vel pretium enim, quis aliquam orci. Quisque egestas justo congue, convallis urna ut, tristique libero. In vel faucibus felis, eget tempus quam. Donec iaculis turpis ut felis aliquet ullamcorper at vel sem. Donec mattis sollicitudin turpis eu placerat. Aliquam condimentum sodales sapien et consequat. In hac habitasse platea dictumst.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}