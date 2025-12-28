// Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const userForm = document.getElementById('user-form');
            const userAvatar = document.getElementById('user-avatar');
            const userFullname = document.getElementById('user-fullname');
            const userEmail = document.getElementById('user-email');
            const firstNameInput = document.getElementById('first-name');
            const lastNameInput = document.getElementById('last-name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const genderInputs = document.querySelectorAll('input[name="gender"]');
            const ordersList = document.getElementById('orders-list');
            const noOrders = document.getElementById('no-orders');
            const supportCallBtn = document.getElementById('support-call-btn');
            const supportPhone = document.getElementById('support-phone');
            const avatarEdit = document.getElementById('avatar-edit');
            const nolist = document.getElementById('des-list');
            
            // Demo data for orders toggle
            let hasOrders = false; // Change to true to see orders list
            
            // Initialize with demo user data
            function initializeUserData() {
                // Set default user data
                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
                
                // Update display
                updateUserDisplay();
                
                // Initialize gender selection
                document.getElementById('gender-none').checked = true;
                updateAvatarByGender('none');
                
                // Toggle orders view
                toggleOrdersView(hasOrders);
            }
            
            // Update user display based on form inputs
            function updateUserDisplay() {
                const firstName = firstNameInput.value || 'کاربر';
                const lastName = lastNameInput.value || 'مهمان';
                const email = emailInput.value || 'user@example.com';
                
                userFullname.textContent = `${firstName} ${lastName}`;
                userEmail.textContent = email;
            }
            
            // Update avatar based on gender selection
            function updateAvatarByGender(gender) {
                // Remove all gender classes
                userAvatar.classList.remove('male', 'female', 'neutral');
                
                // Add appropriate class
                if (gender === 'male') {
                    userAvatar.classList.add('male');
                    userAvatar.innerHTML = '<i class="fas fa-male"></i>';
                } else if (gender === 'female') {
                    userAvatar.classList.add('female');
                    userAvatar.innerHTML = '<i class="fas fa-female"></i>';
                } else {
                    userAvatar.classList.add('neutral');
                    userAvatar.innerHTML = '<i class="fas fa-user"></i>';
                }
            }
            
            // Toggle between orders list and no orders state
            function toggleOrdersView(hasOrders) {
                if (hasOrders) {
                    ordersList.style.display = 'block';
                    noOrders.style.display = 'none';
                } else {
                    ordersList.style.display = 'none';
                    noOrders.style.display = 'flex';
                }
            }
            
            // Form submission
            userForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Update user display
                updateUserDisplay();
                
                // Show success message
                alert('تغییرات با موفقیت ذخیره شد!');
                
                // Simulate saving to server
                console.log('User data saved:', {
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    gender: document.querySelector('input[name="gender"]:checked').value
                });
            });
            
            // Gender selection change
            genderInputs.forEach(input => {
                input.addEventListener('change', function() {
                    if (this.checked) {
                        updateAvatarByGender(this.value);
                    }
                });
            });
            
            // Support call button
            supportCallBtn.addEventListener('click', function() {
                const phoneNumber = supportPhone.textContent.trim();
                
                // Show confirmation dialog
                const confirmCall = confirm(`آیا مایل به تماس با شماره ${phoneNumber} هستید؟`);
                
                if (confirmCall) {
                    // In a real app, this would initiate a phone call
                    alert(`در حال اتصال به ${phoneNumber}...\n\nدر یک اپلیکیشن واقعی، این دکمه تماس تلفنی برقرار می‌کند.`);
                    
                    // Log for demo
                    console.log(`Calling support: ${phoneNumber}`);
                }
            });
            
            // Avatar edit button
            avatarEdit.addEventListener('click', function() {
                
                
                // Simulate avatar upload
                const genders = ['male', 'female', 'neutral'];
                const randomGender = genders[Math.floor(Math.random() * genders.length)];  
            });
            
            // Toggle orders button (for demo purposes - would normally come from server)
            const demoOrdersBtn = document.createElement('button');
            demoOrdersBtn.innerHTML = '<i class="fas fa-eye"></i> نمایش وضعیت سفارشات (دمو)';
            demoOrdersBtn.className = 'btn';
            demoOrdersBtn.style.marginTop = '20px';
            demoOrdersBtn.style.width = '100%';
            demoOrdersBtn.addEventListener('click', function() {
                hasOrders = !hasOrders;
                toggleOrdersView(hasOrders);
                this.innerHTML = hasOrders ? 
                    '<i class="fas fa-eye-slash"></i> مخفی کردن سفارشات' : 
                    '<i class="fas fa-eye"></i> نمایش سفارشات نمونه';
            });
            
            // Add demo button to orders section
            document.querySelector('.orders-content').appendChild(demoOrdersBtn);
            
           
            
            // Initialize page
            initializeUserData();


            
        });