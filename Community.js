// دالة لإضافة منشور جديد
function addPost() {
    const postContent = document.getElementById("postContent").value;
    const postImage = document.getElementById("postImage").files[0];

    if (postContent.trim() === "" && !postImage) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'الرجاء كتابة منشور أو إضافة صورة قبل النشر!',
        });
        return;
    }

    const postsContainer = document.getElementById("postsContainer");

    // إنشاء عنصر المنشور
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // إضافة نص المنشور
    if (postContent.trim() !== "") {
        const postText = document.createElement("p");
        postText.textContent = postContent;
        postDiv.appendChild(postText);
    }

    // إضافة صورة المنشور
    if (postImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("post-image");
            postDiv.appendChild(img);
        };
        reader.readAsDataURL(postImage);
    }

    // إضافة تاريخ النشر
    const postDate = document.createElement("div");
    postDate.classList.add("post-date");
    postDate.textContent = new Date().toLocaleString();
    postDiv.appendChild(postDate);

    // إضافة أزرار التحكم (تعديل، حذف، رد)
    const postControls = document.createElement("div");
    postControls.classList.add("post-controls");

    const editButton = document.createElement("button");
    editButton.textContent = "تعديل";
    editButton.onclick = () => editPost(postDiv);
    postControls.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "حذف";
    deleteButton.onclick = () => deletePost(postDiv);
    postControls.appendChild(deleteButton);

    const replyButton = document.createElement("button");
    replyButton.textContent = "رد";
    replyButton.onclick = () => addReply(postDiv);
    postControls.appendChild(replyButton);

    postDiv.appendChild(postControls);

    // إضافة المنشور إلى القسم
    postsContainer.prepend(postDiv);

    // مسح حقل النص والصورة بعد النشر
    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";

    // إظهار تنبيه نجاح
    Swal.fire({
        icon: 'success',
        title: 'تم النشر بنجاح!',
        text: 'تمت إضافة المنشور بنجاح.',
    });
}

// دالة لتعديل المنشور
function editPost(postDiv) {
    const postText = postDiv.querySelector("p"); // الحصول على نص المنشور
    Swal.fire({
        title: 'تعديل المنشور',
        input: 'textarea',
        inputValue: postText.textContent,
        showCancelButton: true,
        confirmButtonText: 'حفظ التعديل',
        cancelButtonText: 'إلغاء',
        inputValidator: (value) => {
            if (!value.trim()) {
                return 'الرجاء إدخال نص للمنشور!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            postText.textContent = result.value; // تحديث نص المنشور
            Swal.fire({
                icon: 'success',
                title: 'تم التعديل بنجاح!',
                text: 'تم تحديث المنشور بنجاح.',
            });
        }
    });
}

// دالة لحذف المنشور
function deletePost(postDiv) {
    Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'لن تتمكن من استعادة هذا المنشور!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، احذفه',
        cancelButtonText: 'إلغاء',
    }).then((result) => {
        if (result.isConfirmed) {
            postDiv.remove();
            Swal.fire({
                icon: 'success',
                title: 'تم الحذف بنجاح!',
                text: 'تم حذف المنشور بنجاح.',
            });
        }
    });
}

// دالة لإضافة رد
function addReply(postDiv) {
    Swal.fire({
        title: 'إضافة رد',
        input: 'textarea',
        inputPlaceholder: 'اكتب ردك هنا...',
        showCancelButton: true,
        confirmButtonText: 'نشر الرد',
        cancelButtonText: 'إلغاء',
        inputValidator: (value) => {
            if (!value.trim()) {
                return 'الرجاء إدخال نص للرد!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            let repliesSection = postDiv.querySelector(".replies");
            if (!repliesSection) {
                repliesSection = document.createElement("div");
                repliesSection.classList.add("replies");
                postDiv.appendChild(repliesSection);
            }

            const replyDiv = document.createElement("div");
            replyDiv.classList.add("reply");

            const replyText = document.createElement("p");
            replyText.textContent = result.value;
            replyDiv.appendChild(replyText);

            const replyDate = document.createElement("div");
            replyDate.classList.add("reply-date");
            replyDate.textContent = new Date().toLocaleString();
            replyDiv.appendChild(replyDate);

            repliesSection.appendChild(replyDiv);

            Swal.fire({
                icon: 'success',
                title: 'تم إضافة الرد بنجاح!',
                text: 'تم نشر الرد بنجاح.',
            });
        }
    });
}