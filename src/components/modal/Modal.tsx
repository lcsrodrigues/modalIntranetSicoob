import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import axios from 'axios';

export default function Modal() {

    var isVisibleModal = false;
    const [isVisible, setIsVisible] = useState(false);//useState(isVisibleModal == null ? 'true' : isVisibleModal);
    const [modalTitle, setModalTitle] = useState("");
    const [urlImage, setUrlImage] = useState("");
    const [linkImage, setLinkImage] = useState("");
    const [backgroundColor, setBackGroundColor] = useState("#00A288");
    const [headerBackgroundColor, setheaderBackGroundColor] = useState("#003642");

    useEffect(() => {
        console.log("Modal Intranet Siccob");
        function visibibleModal() {
            // window.localStorage.setItem("isVisibleModal", isVisible);
            if (window.location.href === "https://crediminas.sharepoint.com/sites/intranet" && isVisibleModal) {

                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        function getInfoForModal() {
            axios.get("https://crediminas.sharepoint.com/sites/intranet/_api/web/lists/getbytitle('Informações Modal')/items?$top=1&$orderby=ID desc")
                .then((result) => {
                    setModalTitle(result.data.value[0].Title);
                    setUrlImage(result.data.value[0].urlImagem);
                    setLinkImage(result.data.value[0].linkImagem);
                    setBackGroundColor(result.data.value[0].backgroundColor);
                    setheaderBackGroundColor(result.data.value[0].headerBackground);
                    isVisibleModal = result.data.value[0].isVisible;

                    visibibleModal();
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        getInfoForModal();

    }, [])

    function closeModal() {
        //setIsVisible('false');
        setIsVisible(false);
    }

    return (
        <div className={styles.app} style={{ 'display': isVisible == false ? 'none' : 'flex' }}>
            <div className={styles.container}>
                <div className={styles.header} style={{ backgroundColor: headerBackgroundColor }}>
                    <div className={styles.titleHeader}>
                        <span>{modalTitle}</span>
                    </div>
                    <div className={styles.closeHeader} onClick={() => closeModal()}>
                        <img src={require('../../images/close.png')} />
                    </div>
                </div>
                <div className={styles.content} style={{ backgroundColor: backgroundColor }}>
                    <div className={styles.sideLeft}>
                        <a href={linkImage != null ? linkImage : ''} target={linkImage != null ? "_blank" : ''}>
                            <img src={urlImage} />
                        </a>
                        {/* <p dangerouslySetInnerHTML={{ __html: modalDescription }} /> */}
                    </div>
                    {/* <div className={styles.sideRight}>
                        <p>{modalDescription}</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}