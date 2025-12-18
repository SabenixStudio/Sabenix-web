 // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const stepEmail = document.getElementById('step-email');
            const stepPassword = document.getElementById('step-password');
            const stepForgot = document.getElementById('step-forgot');
            const emailPhoneInput = document.getElementById('email-phone');
            const passwordInput = document.getElementById('password');
            const userIdentifierText = document.getElementById('user-identifier-text');
            const nextStepBtn = document.getElementById('next-step-btn');
            const backBtn = document.getElementById('back-btn');
            const backToLoginBtn = document.getElementById('back-to-login');
            const passwordToggle = document.getElementById('password-toggle');
            const forgotPasswordLink = document.getElementById('forgot-password-link');
            const forgotPasswordLink2 = document.getElementById('forgot-password-link-2');
            const emailPhoneValidation = document.getElementById('email-phone-validation');
            const passwordValidation = document.getElementById('password-validation');
            const recoveryValidation = document.getElementById('recovery-validation');
            const loginBtn = document.getElementById('login-btn');
            const recoveryBtn = document.getElementById('recovery-btn');
            const registerLink = document.getElementById('register-link');
            
            // Social login buttons
            const googleLogin = document.getElementById('google-login');
            const facebookLogin = document.getElementById('facebook-login');
            const githubLogin = document.getElementById('github-login');
            
            // Email/Phone validation function
            function validateEmailPhone(value) {
                // Email regex pattern
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                // Iranian phone number pattern (starting with 09)
                const phonePattern = /^09[0-9]{9}$/;
                
                // Remove any non-digit characters except @ and . for email
                const cleanedValue = value.trim();
                
                if (emailPattern.test(cleanedValue)) {
                    return { isValid: true, type: 'email', value: cleanedValue };
                } else if (phonePattern.test(cleanedValue.replace(/\D/g, ''))) {
                    return { isValid: true, type: 'phone', value: cleanedValue.replace(/\D/g, '') };
                } else {
                    return { isValid: false, type: 'unknown', value: cleanedValue };
                }
            }
            
            // Password validation function
            function validatePassword(value) {
                if (value.length < 6) {
                    return { isValid: false, message: 'رمز عبور باید حداقل ۶ کاراکتر داشته باشد' };
                }
                return { isValid: true, message: '' };
            }
            
            // Switch between steps
            function showStep(stepToShow, stepToHide) {
                stepToHide.classList.add('hidden');
                setTimeout(() => {
                    stepToShow.classList.remove('hidden');
                }, 300);
            }
            
            // Format phone number for display
            function formatPhoneNumber(phone) {
                const cleaned = phone.replace(/\D/g, '');
                const match = cleaned.match(/^(\d{2})(\d{4})(\d{5})$/);
                if (match) {
                    return `۰${match[1]}-${match[2]}-${match[3]}`;
                }
                return phone;
            }
            
            // Format email for display (hide part of it)
            function formatEmail(email) {
                const [localPart, domain] = email.split('@');
                if (localPart.length > 3) {
                    const visiblePart = localPart.substring(0, 3);
                    const hiddenPart = '*'.repeat(localPart.length - 3);
                    return `${visiblePart}${hiddenPart}@${domain}`;
                }
                return email;
            }
            
            // Step 1: Email/Phone form submission
            document.getElementById('email-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailPhoneValue = emailPhoneInput.value.trim();
                const validationResult = validateEmailPhone(emailPhoneValue);
                
                // Clear previous validation message
                emailPhoneValidation.className = 'validation-message';
                
                if (!validationResult.isValid) {
                    emailPhoneValidation.textContent = 'لطفاً یک ایمیل یا شماره تلفن معتبر وارد کنید';
                    emailPhoneValidation.classList.add('error');
                    emailPhoneInput.classList.add('error');
                    return;
                }
                
                // Show success validation
                emailPhoneValidation.textContent = validationResult.type === 'email' 
                    ? 'ایمیل معتبر است' 
                    : 'شماره تلفن معتبر است';
                emailPhoneValidation.classList.add('success');
                emailPhoneInput.classList.remove('error');
                
                // Store the identifier for display
                const displayValue = validationResult.type === 'email'
                    ? formatEmail(validationResult.value)
                    : formatPhoneNumber(validationResult.value);
                
                userIdentifierText.textContent = `ورود با: ${displayValue}`;
                
                // Show loading on button
                nextStepBtn.classList.add('loading');
                nextStepBtn.disabled = true;
                
                // Simulate API call to check if user exists
                setTimeout(() => {
                    nextStepBtn.classList.remove('loading');
                    nextStepBtn.disabled = false;
                    
                    // Move to password step
                    showStep(stepPassword, stepEmail);
                    
                    // Auto focus on password field
                    setTimeout(() => {
                        passwordInput.focus();
                    }, 100);
                }, 1000);
            });
            
            // Back button to edit email/phone
            backBtn.addEventListener('click', function() {
                showStep(stepEmail, stepPassword);
                setTimeout(() => {
                    emailPhoneInput.focus();
                    emailPhoneInput.select();
                }, 100);
            });
            
            // Back to login from forgot password
            backToLoginBtn.addEventListener('click', function() {
                showStep(stepEmail, stepForgot);
                setTimeout(() => {
                    emailPhoneInput.focus();
                }, 100);
            });
            
            // Password visibility toggle
            let passwordVisible = false;
            passwordToggle.addEventListener('click', function() {
                passwordVisible = !passwordVisible;
                passwordInput.type = passwordVisible ? 'text' : 'password';
                passwordToggle.innerHTML = passwordVisible 
                    ? '<i class="fas fa-eye-slash"></i>' 
                    : '<i class="fas fa-eye"></i>';
            });
            
            // Step 2: Password form submission
            document.getElementById('password-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const passwordValue = passwordInput.value;
                const validationResult = validatePassword(passwordValue);
                
                // Clear previous validation message
                passwordValidation.className = 'validation-message';
                
                if (!validationResult.isValid) {
                    passwordValidation.textContent = validationResult.message;
                    passwordValidation.classList.add('error');
                    passwordInput.classList.add('error');
                    return;
                }
                
                // Show success validation
                passwordValidation.textContent = 'رمز عبور معتبر است';
                passwordValidation.classList.add('success');
                passwordInput.classList.remove('error');
                
                // Show loading on button
                loginBtn.classList.add('loading');
                loginBtn.disabled = true;
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ورود...';
                
                // Simulate login API call
                setTimeout(() => {
                    // In a real app, you would redirect to dashboard
                    alert('ورود موفقیت‌آمیز بود! در حال انتقال به پنل کاربری...');
                    
                    // Reset form
                    loginBtn.classList.remove('loading');
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> ورود به حساب';
                    
                    // Redirect to dashboard (in a real app)
                    console.log('Redirecting to dashboard...');
                    // window.location.href = 'dashboard.html';
                }, 1500);
            });
            
            // Forgot password links
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                showStep(stepForgot, stepEmail);
            });
            
            forgotPasswordLink2.addEventListener('click', function(e) {
                e.preventDefault();
                showStep(stepForgot, stepPassword);
            });
            
            // Step 3: Forgot password form submission
            document.getElementById('forgot-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const recoveryValue = document.getElementById('recovery-email-phone').value.trim();
                const validationResult = validateEmailPhone(recoveryValue);
                
                // Clear previous validation message
                recoveryValidation.className = 'validation-message';
                
                if (!validationResult.isValid) {
                    recoveryValidation.textContent = 'لطفاً یک ایمیل یا شماره تلفن معتبر وارد کنید';
                    recoveryValidation.classList.add('error');
                    return;
                }
                
                // Show success validation
                recoveryValidation.textContent = validationResult.type === 'email' 
                    ? 'لینک بازیابی به ایمیل شما ارسال شد' 
                    : 'پیامک بازیابی به شماره تلفن شما ارسال شد';
                recoveryValidation.classList.add('success');
                
                // Show loading on button
                recoveryBtn.classList.add('loading');
                recoveryBtn.disabled = true;
                recoveryBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
                
                // Simulate recovery API call
                setTimeout(() => {
                    recoveryBtn.classList.remove('loading');
                    recoveryBtn.disabled = false;
                    recoveryBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ارسال لینک بازیابی';
                    
                    // Show success message
                    alert('لینک بازیابی رمز عبور برای شما ارسال شد. لطفاً ایمیل یا پیامک خود را بررسی کنید.');
                    
                    // Return to login
                    showStep(stepEmail, stepForgot);
                }, 1500);
            });
            
            // Social login buttons
            googleLogin.addEventListener('click', function() {
                alert('در حال اتصال به حساب Google...\n\nدر یک اپلیکیشن واقعی، این دکمه شما را به صفحه احراز هویت Google هدایت می‌کند.');
                console.log('Google login initiated');
            });
            
            facebookLogin.addEventListener('click', function() {
                alert('در حال اتصال به حساب Facebook...\n\nدر یک اپلیکیشن واقعی، این دکمه شما را به صفحه احراز هویت Facebook هدایت می‌کند.');
                console.log('Facebook login initiated');
            });
            
            githubLogin.addEventListener('click', function() {
                alert('در حال اتصال به حساب GitHub...\n\nدر یک اپلیکیشن واقعی، این دکمه شما را به صفحه احراز هویت GitHub هدایت می‌کند.');
                console.log('GitHub login initiated');
            });
            
            // Register link
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('در حال انتقال به صفحه ثبت‌نام...\n\nدر یک اپلیکیشن واقعی، این لینک شما را به صفحه ثبت‌نام هدایت می‌کند.');
                // window.location.href = 'register.html';
            });
            
            // Mobile menu toggle
            document.querySelector('.mobile-menu').addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
            
            // Auto-detect input type and format accordingly
            emailPhoneInput.addEventListener('input', function() {
                // Clear validation messages when user starts typing
                emailPhoneValidation.className = 'validation-message';
                emailPhoneInput.classList.remove('error');
                
                // Auto-format phone numbers as user types
                const value = this.value.replace(/\D/g, '');
                if (value.length > 0 && value[0] === '9') {
                    // Assume it's a phone number (Iranian)
                    let formatted = value;
                    if (value.length > 4) {
                        formatted = `${value.slice(0, 4)}-${value.slice(4)}`;
                    }
                    if (value.length > 7) {
                        formatted = `${value.slice(0, 4)}-${value.slice(4, 7)}-${value.slice(7)}`;
                    }
                    this.value = formatted;
                }
            });
        });