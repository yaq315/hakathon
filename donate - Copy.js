document.getElementById('donateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    
    document.getElementById('donateForm').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
});