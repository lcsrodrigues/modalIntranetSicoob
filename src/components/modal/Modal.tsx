import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import axios from 'axios';

export default function Modal() {

    var isVisibleModal = window.localStorage.getItem("isVisibleModal");
    const [isVisible, setIsVisible] = useState(true);//useState(isVisibleModal == null ? 'true' : isVisibleModal);
    const [modalDescription, setModalDescription] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
        function getInfoForModal() {
            axios.get("https://crediminas.sharepoint.com/sites/intranet/_api/web/lists/getbytitle('Informações Modal')/items?$top=1&$orderby=ID desc")
                .then(function (result) {
                    console.log(result);
                    setModalTitle(result.data.value[0].Title);
                    setModalDescription(result.data.value[0].DescricaoModal);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
        function visibibleModal() {
            window.localStorage.setItem("isVisibleModal", isVisible);
        }
        getInfoForModal();
        //visibibleModal();
    }, [isVisible])

    function closeModal() {
        //setIsVisible('false');
        setIsVisible(false);
    }

    return (
        <div className={styles.app} style={{ 'display': isVisible == false ? 'none' : 'flex' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.titleHeader}>
                        <span>{modalTitle}</span>
                    </div>
                    <div className={styles.closeHeader} onClick={() => closeModal()}>
                        <img src={require('../../images/close.png')} />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.sideLeft}>
                        <p dangerouslySetInnerHTML={{ __html: modalDescription }} />
                    </div>
                    {/* <div className={styles.sideRight}>
                        <p>{modalDescription}</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}