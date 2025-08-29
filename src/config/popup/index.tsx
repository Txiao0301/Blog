import './index.css';
interface PopupProps {
    showModal: boolean; // Whether the popup is visible
    content: string; // Content to display in the popup
    confirm: () => void; // Function to call when the user confirms the action
    cancel: () => void; // Optional, can be used to cancel the action
}

function Popup({ showModal, content, confirm, cancel }: PopupProps) {
    if (!showModal) return null;

    return (
        <div className="popup">
            <div className="popup-content">
                <div style={{ marginBottom: 16 }}>{content}</div>
                <button onClick={confirm} style={{ marginRight: 16 }}>确定</button>
                <button onClick={cancel}>取消</button>
            </div>
        </div>
    );
}

export default Popup;