// Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Dropdown toggle functionality
            const dropdownHeaders = document.querySelectorAll('.dropdown-header');
            dropdownHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                });
            });

            // Get all checkboxes and radio buttons
            const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            
            // Color pickers
            const colorTealPicker = document.getElementById('color-teal');
            const colorOrangePicker = document.getElementById('color-orange');
            const colorTealValue = document.getElementById('color-teal-value');
            const colorOrangeValue = document.getElementById('color-orange-value');
            const colorResetBtn = document.getElementById('color-reset');
            
            // Update color values display
            function updateColorValues() {
                colorTealValue.textContent = colorTealPicker.value;
                colorOrangeValue.textContent = colorOrangePicker.value;
            }
            
            // Color picker change events
            colorTealPicker.addEventListener('input', function() {
                updateColorValues();
                updatePreview();
            });
            
            colorOrangePicker.addEventListener('input', function() {
                updateColorValues();
                updatePreview();
            });
            
            // Color reset button
            colorResetBtn.addEventListener('click', function() {
                colorTealPicker.value = '#008080';
                colorOrangePicker.value = '#ff7b25';
                updateColorValues();
                updatePreview();
            });
            
            // Initialize color values
            updateColorValues();
            
            // Add change event listener to all checkboxes and radios
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updatePreview);
            });

            // Update preview initially
            updatePreview();

            // Save configuration button
            document.getElementById('save-config').addEventListener('click', function() {
                const userComments = document.getElementById('user-comments').value;
                
                if (userComments.trim()) {
                    alert('پیکربندی وبسایت شما ذخیره شد!\n\nنظرات شما نیز ثبت شد:\n' + userComments);
                } else {
                    alert('پیکربندی وبسایت شما ذخیره شد!');
                }
                
                // In a real application, you would send this to a server
            });

            // Reset configuration button
            document.getElementById('reset-config').addEventListener('click', function() {
                // Reset all checkboxes and radios
                checkboxes.forEach(checkbox => {
                    if (checkbox.type === 'checkbox') {
                        checkbox.checked = checkbox.id === 'header-shadow' || 
                                          checkbox.id === 'footer-logo' || 
                                          checkbox.id === 'footer-links' || 
                                          checkbox.id === 'footer-social' ||
                                          checkbox.id === 'feature-slider' ||
                                          checkbox.id === 'feature-testimonials' ||
                                          checkbox.id === 'feature-cta' ||
                                          checkbox.id === 'capability-responsive' ||
                                          checkbox.id === 'capability-seo' ||
                                          checkbox.id === 'capability-fast';
                    } else if (checkbox.type === 'radio') {
                        checkbox.checked = checkbox.id === 'header-top' || 
                                          checkbox.id === 'footer-bottom' || 
                                          checkbox.id === 'sidebar-none' || 
                                          checkbox.id === 'layout-full' ||
                                          checkbox.id === 'structure-1' ||
                                          checkbox.id === 'theme-light';
                    }
                });
                
                // Reset color pickers
                colorTealPicker.value = '#008080';
                colorOrangePicker.value = '#ff7b25';
                updateColorValues();
                
                // Clear comments
                document.getElementById('user-comments').value = '';
                
                updatePreview();
                alert('تمام تنظیمات به حالت پیش‌فرض بازگردانده شد!');
            });

            // Export configuration button
            document.getElementById('export-config').addEventListener('click', function() {
                const userComments = document.getElementById('user-comments').value;
                let message = 'کد HTML وبسایت شما آماده است!\n\n';
                
                if (userComments.trim()) {
                    message += 'نظرات شما نیز ذخیره شد و در نظر گرفته خواهد شد.\n\n';
                }
                
                message += 'در یک برنامه واقعی، این دکمه کدهای تولید شده را دانلود می‌کند.';
                alert(message);
            });

            // Mobile menu toggle
            document.querySelector('.mobile-menu').addEventListener('click', function() {
                const navLinks = document.querySelector('.nav-links');
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        });

        // Function to update preview based on selections
        function updatePreview() {
            const previewContainer = document.getElementById('preview-container');
            const previewHeader = document.getElementById('preview-header');
            const previewSidebar = document.getElementById('preview-sidebar');
            const previewFooter = document.getElementById('preview-footer');
            const previewFeatures = document.getElementById('preview-features');
            
            // Get selected colors
            const tealColor = document.getElementById('color-teal').value;
            const orangeColor = document.getElementById('color-orange').value;
            
            // Calculate darker and lighter versions for UI
            function darkenColor(color, percent) {
                const num = parseInt(color.slice(1), 16);
                const amt = Math.round(2.55 * percent);
                const R = (num >> 16) - amt;
                const G = (num >> 8 & 0x00FF) - amt;
                const B = (num & 0x0000FF) - amt;
                return "#" + (
                    0x1000000 +
                    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                    (B < 255 ? B < 1 ? 0 : B : 255)
                ).toString(16).slice(1);
            }
            
            function lightenColor(color, percent) {
                const num = parseInt(color.slice(1), 16);
                const amt = Math.round(2.55 * percent);
                const R = (num >> 16) + amt;
                const G = (num >> 8 & 0x00FF) + amt;
                const B = (num & 0x0000FF) + amt;
                return "#" + (
                    0x1000000 +
                    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                    (B < 255 ? B < 1 ? 0 : B : 255)
                ).toString(16).slice(1);
            }
            
            const darkTealColor = darkenColor(tealColor, 20);
            const lightTealColor = lightenColor(tealColor, 90);
            const darkOrangeColor = darkenColor(orangeColor, 20);
            const lightOrangeColor = lightenColor(orangeColor, 90);
            
            // Update CSS custom properties
            document.documentElement.style.setProperty('--teal', tealColor);
            document.documentElement.style.setProperty('--dark-teal', darkTealColor);
            document.documentElement.style.setProperty('--light-teal', lightTealColor);
            document.documentElement.style.setProperty('--orange', orangeColor);
            document.documentElement.style.setProperty('--dark-orange', darkOrangeColor);
            document.documentElement.style.setProperty('--light-orange', lightOrangeColor);
            
            // Update header
            const headerPosition = document.querySelector('input[name="header-position"]:checked').value;
            const headerFixed = document.getElementById('header-fixed').checked;
            const headerTransparent = document.getElementById('header-transparent').checked;
            const headerShadow = document.getElementById('header-shadow').checked;
            
            // Show/hide header
            if (headerPosition === 'none') {
                previewHeader.classList.remove('show');
            } else {
                previewHeader.classList.add('show');
                
                // Update header position class
                previewHeader.classList.remove('position-top', 'position-left', 'position-right');
                previewHeader.classList.add(`position-${headerPosition}`);
                
                // Update header style
                previewHeader.style.opacity = headerTransparent ? '0.8' : '1';
                previewHeader.style.boxShadow = headerShadow ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
                previewHeader.style.position = headerFixed && headerPosition === 'top' ? 'sticky' : 'static';
                previewHeader.style.top = headerFixed && headerPosition === 'top' ? '0' : 'auto';
            }
            
            // Update footer
            const footerPosition = document.querySelector('input[name="footer-position"]:checked').value;
            const footerLogo = document.getElementById('footer-logo').checked;
            const footerLinks = document.getElementById('footer-links').checked;
            const footerSocial = document.getElementById('footer-social').checked;
            const footerNewsletter = document.getElementById('footer-newsletter').checked;
            
            // Show/hide footer
            if (footerPosition === 'none') {
                previewFooter.classList.remove('show');
            } else {
                previewFooter.classList.add('show');
                previewFooter.classList.remove('position-bottom');
                previewFooter.classList.add(`position-${footerPosition}`);
                
                // Update footer content
                let footerContent = '<h3>فوتر وبسایت</h3><div style="font-size: 0.9rem; margin-top: 10px;">';
                if (footerLogo) footerContent += '<div>✓ لوگو</div>';
                if (footerLinks) footerContent += '<div>✓ لینک‌های مفید</div>';
                if (footerSocial) footerContent += '<div>✓ شبکه‌های اجتماعی</div>';
                if (footerNewsletter) footerContent += '<div>✓ خبرنامه</div>';
                footerContent += '</div>';
                previewFooter.innerHTML = footerContent;
            }
            
            // Update sidebar
            const sidebarPosition = document.querySelector('input[name="sidebar-position"]:checked').value;
            const sidebarMenu = document.getElementById('sidebar-menu').checked;
            const sidebarSearch = document.getElementById('sidebar-search').checked;
            const sidebarPosts = document.getElementById('sidebar-posts').checked;
            const sidebarCategories = document.getElementById('sidebar-categories').checked;
            
            // Show/hide sidebar
            if (sidebarPosition === 'none') {
                previewSidebar.classList.remove('show');
                previewSidebar.classList.remove('position-left', 'position-right');
            } else {
                previewSidebar.classList.add('show');
                previewSidebar.classList.remove('position-left', 'position-right');
                previewSidebar.classList.add(`position-${sidebarPosition}`);
                
                // Update sidebar content
                let sidebarContent = '<h4>نوار کناری</h4>';
                if (sidebarMenu) sidebarContent += '<p>• منوی سایت</p>';
                if (sidebarSearch) sidebarContent += '<p>• جستجو</p>';
                if (sidebarPosts) sidebarContent += '<p>• آخرین مطالب</p>';
                if (sidebarCategories) sidebarContent += '<p>• دسته‌بندی‌ها</p>';
                previewSidebar.innerHTML = sidebarContent;
            }
            
            // Update layout
            const layoutType = document.querySelector('input[name="layout-type"]:checked').value;
            const pageStructure = document.querySelector('input[name="page-structure"]:checked').value;
            
            // Update layout classes
            previewContainer.classList.remove('layout-1', 'layout-2', 'layout-3');
            previewContainer.classList.add(`layout-${pageStructure}`);
            
            // Update layout style
            if (layoutType === 'boxed') {
                previewContainer.style.maxWidth = '1000px';
                previewContainer.style.margin = '0 auto';
            } else if (layoutType === 'fluid') {
                previewContainer.style.maxWidth = '100%';
                previewContainer.style.margin = '0';
            } else {
                previewContainer.style.maxWidth = 'none';
                previewContainer.style.margin = '0';
            }
            
            // Update colors theme
            const colorTheme = document.querySelector('input[name="color-theme"]:checked').value;
            
            // Update color scheme in preview
            if (colorTheme === 'dark') {
                previewContainer.style.backgroundColor = '#222';
                previewContainer.style.color = '#eee';
                document.querySelector('.preview-content').style.backgroundColor = '#333';
                document.querySelector('.preview-content').style.color = '#eee';
                if (previewSidebar.classList.contains('show')) {
                    previewSidebar.style.backgroundColor = '#444';
                }
            } else {
                previewContainer.style.backgroundColor = '';
                previewContainer.style.color = '';
                document.querySelector('.preview-content').style.backgroundColor = '';
                document.querySelector('.preview-content').style.color = '';
                if (previewSidebar.classList.contains('show')) {
                    previewSidebar.style.backgroundColor = lightOrangeColor;
                }
            }
            
            // Update features
            const featureSlider = document.getElementById('feature-slider').checked;
            const featureGallery = document.getElementById('feature-gallery').checked;
            const featureTestimonials = document.getElementById('feature-testimonials').checked;
            const featureCta = document.getElementById('feature-cta').checked;
            const capabilityResponsive = document.getElementById('capability-responsive').checked;
            const capabilitySeo = document.getElementById('capability-seo').checked;
            const capabilityFast = document.getElementById('capability-fast').checked;
            const capabilityMultilang = document.getElementById('capability-multilang').checked;
            
            // Update features in preview
            let featuresHTML = '';
            if (featureSlider) featuresHTML += `<div class="preview-feature" style="background: ${lightTealColor}; padding: 10px; margin: 10px 0; border-radius: 4px; border-right: 4px solid ${tealColor};">اسلایدر تصاویر</div>`;
            if (featureGallery) featuresHTML += `<div class="preview-feature" style="background: ${lightTealColor}; padding: 10px; margin: 10px 0; border-radius: 4px; border-right: 4px solid ${tealColor};">گالری تصاویر</div>`;
            if (featureTestimonials) featuresHTML += `<div class="preview-feature" style="background: ${lightTealColor}; padding: 10px; margin: 10px 0; border-radius: 4px; border-right: 4px solid ${tealColor};">نظرات مشتریان</div>`;
            if (featureCta) featuresHTML += `<div class="preview-feature" style="background: ${orangeColor}; color: white; padding: 10px; margin: 10px 0; border-radius: 4px;">دکمه اقدام ویژه</div>`;
            
            // Add capabilities as badges
            let capabilitiesHTML = '<div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 5px;">';
            if (capabilityResponsive) capabilitiesHTML += `<span style="background: ${tealColor}; color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">ریسپانسیو</span>`;
            if (capabilitySeo) capabilitiesHTML += `<span style="background: ${tealColor}; color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">سئو</span>`;
            if (capabilityFast) capabilitiesHTML += `<span style="background: ${tealColor}; color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">سریع</span>`;
            if (capabilityMultilang) capabilitiesHTML += `<span style="background: ${tealColor}; color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">چندزبانه</span>`;
            capabilitiesHTML += '</div>';
            
            previewFeatures.innerHTML = featuresHTML + capabilitiesHTML;
            
            // Update summary
            updateSummary();
        }
        
        // Function to update selection summary
        function updateSummary() {
            // Header summary
            const headerPosition = document.querySelector('input[name="header-position"]:checked').value;
            const headerFixed = document.getElementById('header-fixed').checked;
            let headerSummary = '';
            
            if (headerPosition === 'none') {
                headerSummary = 'غیرفعال';
            } else {
                headerSummary = headerPosition === 'top' ? 'بالای صفحه' : 
                               headerPosition === 'left' ? 'سمت چپ' : 'سمت راست';
                if (headerFixed) headerSummary += ' (ثابت)';
            }
            document.getElementById('summary-header').textContent = headerSummary;
            
            // Footer summary
            const footerPosition = document.querySelector('input[name="footer-position"]:checked').value;
            document.getElementById('summary-footer').textContent = 
                footerPosition === 'none' ? 'غیرفعال' : 'پایین صفحه (فعال)';
            
            // Sidebar summary
            const sidebarPosition = document.querySelector('input[name="sidebar-position"]:checked').value;
            document.getElementById('summary-sidebar').textContent = 
                sidebarPosition === 'none' ? 'غیرفعال' : 
                sidebarPosition === 'left' ? 'سمت راست' : 'سمت چپ';
            
            // Layout summary
            const pageStructure = document.querySelector('input[name="page-structure"]:checked').value;
            const layoutSummary = pageStructure === '1' ? 'تک ستونه' : 
                                 pageStructure === '2' ? 'دو ستونه (سایدبار چپ)' : 'دو ستونه (سایدبار چپ)';
            document.getElementById('summary-layout').textContent = layoutSummary;
            
            // Colors summary
            const tealColor = document.getElementById('color-teal').value;
            const orangeColor = document.getElementById('color-orange').value;
            const colorTheme = document.querySelector('input[name="color-theme"]:checked').value;
            
            let themeName = colorTheme === 'light' ? 'روشن' : 
                           colorTheme === 'dark' ? 'تیره' : 'خودکار';
            
            document.getElementById('summary-colors').textContent = `رنگ اصلی: ${tealColor} / ${themeName}`;
            
            // Features summary
            const featureSlider = document.getElementById('feature-slider').checked;
            const featureGallery = document.getElementById('feature-gallery').checked;
            const featureTestimonials = document.getElementById('feature-testimonials').checked;
            const featureCta = document.getElementById('feature-cta').checked;
            
            let featuresList = [];
            if (featureSlider) featuresList.push('اسلایدر');
            if (featureGallery) featuresList.push('گالری');
            if (featureTestimonials) featuresList.push('نظرات مشتریان');
            if (featureCta) featuresList.push('دکمه اقدام');
            
            document.getElementById('summary-features').textContent = 
                featuresList.length > 0 ? featuresList.join('، ') : 'هیچکدام';
        }