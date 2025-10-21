const roleUserBtn = document.getElementById('roleUserLabel');
const roleVendorBtn = document.getElementById('roleVendorLabel');
const userForm = document.getElementById('userForm');
const vendorForm = document.getElementById('vendorForm');

function showRole(role) {
    if (role === 'user') {
        // Form toggle
        userForm.classList.remove('hidden');
        vendorForm.classList.add('hidden');

        // Animation
        userForm.classList.add('animate-fadeIn');
        vendorForm.classList.remove('animate-fadeIn');

        // Active button highlight
        roleUserBtn.classList.add('btn-primary', 'scale-105');
        roleUserBtn.classList.remove('btn-outline');
        roleVendorBtn.classList.remove('btn-primary', 'scale-105');
        roleVendorBtn.classList.add('btn-outline');
    } else {
        vendorForm.classList.remove('hidden');
        userForm.classList.add('hidden');

        vendorForm.classList.add('animate-fadeIn');
        userForm.classList.remove('animate-fadeIn');

        roleVendorBtn.classList.add('btn-primary', 'scale-105');
        roleVendorBtn.classList.remove('btn-outline');
        roleUserBtn.classList.remove('btn-primary', 'scale-105');
        roleUserBtn.classList.add('btn-outline');
    }
}

// Event listeners
roleUserBtn.addEventListener('click', () => showRole('user'));
roleVendorBtn.addEventListener('click', () => showRole('vendor'));

// Image preview for user
const userImage = document.getElementById('userImage');
const userPreview = document.getElementById('userPreview');
userImage.addEventListener('change', () => {
    const file = userImage.files[0];
    if (!file) { userPreview.classList.add('hidden'); return; }
    const url = URL.createObjectURL(file);
    userPreview.src = url;
    userPreview.classList.remove('hidden');
});

// Vendor image preview
const vendorImage = document.getElementById('vendorImage');
const vendorPreview = document.getElementById('vendorPreview');
vendorImage.addEventListener('change', () => {
    const file = vendorImage.files[0];
    if (!file) { vendorPreview.classList.add('hidden'); return; }
    const url = URL.createObjectURL(file);
    vendorPreview.src = url;
    vendorPreview.classList.remove('hidden');
});

// initialize
showRole('user');