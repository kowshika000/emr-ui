function DoctorNurseLoader() {
    return (
        <div style={styles.loaderContainer}>
            <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 100 100" xmlSpace="preserve" style={styles.svg}>
                <circle fill="#ADD8E6" stroke="none" cx="20" cy="50" r="4">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1s" />
                </circle>
                <circle fill="#fae2d5" stroke="none" cx="40" cy="50" r="4">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2s" />
                </circle>
                <circle fill="#cce7ff" stroke="none" cx="60" cy="50" r="4">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3s" />
                </circle>
            </svg>
        </div>
    );
}

const styles = {
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',  
        width: '150vw',   
    },
    svg: {
        width: '600px',   
        height: '600px',  
    }
};

export default DoctorNurseLoader;
