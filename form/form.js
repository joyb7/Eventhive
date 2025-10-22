const roleUserBtn = document.getElementById('roleUserLabel');
const roleVendorBtn = document.getElementById('roleVendorLabel');
const userForm = document.getElementById('userForm');
const vendorForm = document.getElementById('vendorForm');
const formContainer = document.getElementById('formContainer');

/**
 * Toggles the visibility of the forms and updates the role button's active state.
 * @param {string} role - 'user' or 'vendor'
 */
function showRole(role) {
    const activeForm = role === 'user' ? userForm : vendorForm;
    const inactiveForm = role === 'user' ? vendorForm : userForm;

    userForm.style.opacity = '0';
    vendorForm.style.opacity = '0';
    
    setTimeout(() => {
        inactiveForm.classList.add('hidden');
        activeForm.classList.remove('hidden');

        formContainer.classList.add('shadow-lg', 'scale-[1.005]');
        
        setTimeout(() => {
            activeForm.style.opacity = '1';
            activeForm.classList.remove('animate-slideIn'); 
            void activeForm.offsetWidth;
            activeForm.classList.add('animate-slideIn');
            formContainer.classList.remove('shadow-lg', 'scale-[1.005]');
        }, 50); 

    }, 300); 

    if (role === 'user') {
        roleUserBtn.classList.add('btn-active-style');
        roleVendorBtn.classList.remove('btn-active-style');
    } else {
        roleVendorBtn.classList.add('btn-active-style');
        roleUserBtn.classList.remove('btn-active-style');
    }
}


roleUserBtn.addEventListener('click', () => showRole('user'));
roleVendorBtn.addEventListener('click', () => showRole('vendor'));

/**
 * Sets up the image preview functionality for a given file input and image element.
 * @param {HTMLElement} fileInput 
 * @param {HTMLElement} previewImage 
 */
function setupImagePreview(fileInput, previewImage) {
    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (!file) {
            previewImage.classList.add('hidden');
            previewImage.src = ''; 
            return;
        }
        
        previewImage.alt = 'Loading preview...';
        const url = URL.createObjectURL(file);
        previewImage.src = url;
        previewImage.classList.remove('hidden');

        previewImage.onload = () => {
            URL.revokeObjectURL(url);
        };
    });
}

const userImage = document.getElementById('userImage');
const userPreview = document.getElementById('userPreview');
setupImagePreview(userImage, userPreview);

const vendorImage = document.getElementById('vendorImage');
const vendorPreview = document.getElementById('vendorPreview');
setupImagePreview(vendorImage, vendorPreview);


showRole('user');
userForm.style.opacity = '1'; 

function handleFormSubmit(e, role) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = `<span class="loading loading-spinner loading-md"></span> Processing...`;
    submitButton.disabled = true;

    setTimeout(() => {
        alert(`${role} request submitted successfully! Redirecting to main page.`);
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        window.location.href = "../main/main.html"; 
    }, 1500); 
}

userForm.addEventListener('submit', (e) => handleFormSubmit(e, 'User'));
vendorForm.addEventListener('submit', (e) => handleFormSubmit(e, 'Vendor'));