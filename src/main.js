// Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add active state
            this.style.opacity = '0.8';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        .modal.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: rgba(15, 15, 15, 0.95);
            padding: 40px;
            border: 1px solid rgba(0, 217, 255, 0.2);
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.3);
            animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .modal-header {
            font-size: 28px;
            font-weight: 900;
            background: linear-gradient(135deg, #ffffff, #00d9ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 30px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            color: #a0a0a0;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px;
            background-color: rgba(0, 217, 255, 0.05);
            border: 1px solid rgba(0, 217, 255, 0.2);
            color: #ffffff;
            font-size: 14px;
            border-radius: 4px;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .form-group input:focus {
            outline: none;
            border-color: #00d9ff;
            background-color: rgba(0, 217, 255, 0.1);
            box-shadow: 0 0 12px rgba(0, 217, 255, 0.3);
        }

        .modal-buttons {
            display: flex;
            gap: 12px;
            margin-top: 30px;
        }

        .modal-btn {
            flex: 1;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: none;
        }

        .modal-btn-submit {
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            color: #000;
        }

        .modal-btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
        }

        .modal-btn-cancel {
            background-color: transparent;
            border: 2px solid #00d9ff;
            color: #00d9ff;
        }

        .modal-btn-cancel:hover {
            background-color: rgba(0, 217, 255, 0.1);
            box-shadow: 0 0 12px rgba(0, 217, 255, 0.4);
        }

        .toggle-form {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #a0a0a0;
        }

        .toggle-form a {
            color: #00d9ff;
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
        }

        .toggle-form a:hover {
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // Login and Register functionality
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');

    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            showRegisterModal();
        });
    }

    function showLoginModal() {
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">Login</div>
                <form id="login-form">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="modal-btn modal-btn-submit">Login</button>
                        <button type="button" class="modal-btn modal-btn-cancel" onclick="document.getElementById('auth-modal').remove()">Close</button>
                    </div>
                    <div class="toggle-form">
                        Don't have an account? <a onclick="showRegisterModal()">Register here</a>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login successful! Welcome to ARENA.');
            modal.remove();
        });
    }

    function showRegisterModal() {
        const existingModal = document.getElementById('auth-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'auth-modal';
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">Register</div>
                <form id="register-form">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Choose your username" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" required>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" required>
                    </div>
                    <div class="modal-buttons">
                        <button type="submit" class="modal-btn modal-btn-submit">Register</button>
                        <button type="button" class="modal-btn modal-btn-cancel" onclick="document.getElementById('auth-modal').remove()">Close</button>
                    </div>
                    <div class="toggle-form">
                        Already have an account? <a onclick="showLoginModal()">Login here</a>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            alert('Registration successful! You can now login to ARENA.');
            modal.remove();
        });
    }

    // Make functions global for inline onclick handlers
    window.showLoginModal = showLoginModal;
    window.showRegisterModal = showRegisterModal;
});
