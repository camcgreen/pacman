import Keyboard from '../components/keyboard';

export default function Play() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 140,
            }}
        >
            <input
                type='email'
                id='keyboard-input'
                style={{ width: 750, height: 30 }}
            />
            <Keyboard />
        </div>
    );
}
