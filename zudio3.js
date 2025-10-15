// Elements
    const dateRadios = document.getElementsByName('dateOption');
    const datePicker = document.getElementById('futureDate');
    const sameDetails = document.getElementById('sameDetails');

    // Toggle date picker visibility based on selected radio
    function updateDatePickerVisibility(){
      const sel = document.querySelector('input[name="dateOption"]:checked').value;
      if(sel === 'later'){
        datePicker.style.display = 'inline-block';
        // set minimum to today
        const today = new Date().toISOString().split('T')[0];
        datePicker.min = today;
      } else {
        datePicker.style.display = 'none';
        datePicker.value = '';
      }
    }
    // initial
    updateDatePickerVisibility();
    dateRadios.forEach(r => r.addEventListener('change', updateDatePickerVisibility));

    // "Same as Sender's Details" copy function
    function copySenderToReceiver(){
      const sFirst = document.getElementById('senderFirst');
      const sLast = document.getElementById('senderLast');
      const sEmail = document.getElementById('senderEmail');
      const rFirst = document.getElementById('receiverFirst');
      const rLast = document.getElementById('receiverLast');
      const rEmail = document.getElementById('receiverEmail');

      if(sameDetails.checked){
        rFirst.value = sFirst.value;
        rLast.value = sLast.value;
        rEmail.value = sEmail.value;
        sameDetails.setAttribute('aria-checked','true');
      } else {
        rFirst.value = '';
        rLast.value = '';
        rEmail.value = '';
        sameDetails.setAttribute('aria-checked','false');
      }
    }

    // If user edits sender fields while checkbox is checked, keep receiver in sync
    ['senderFirst','senderLast','senderEmail'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        if(sameDetails.checked) copySenderToReceiver();
      });
    });

    sameDetails.addEventListener('change', () => {
      copySenderToReceiver();
    });

    // Submit - simple validation and console output
    document.getElementById('submitBtn').addEventListener('click', () => {
      const sFirst = document.getElementById('senderFirst').value.trim();
      const sLast = document.getElementById('senderLast').value.trim();
      const sEmail = document.getElementById('senderEmail').value.trim();
      const rFirst = document.getElementById('receiverFirst').value.trim();
      const rLast = document.getElementById('receiverLast').value.trim();
      const rEmail = document.getElementById('receiverEmail').value.trim();

      if(!sFirst || !sLast || !sEmail || !rFirst || !rLast || !rEmail){
        alert('Please fill all required sender and receiver fields.');
        return;
      }

      const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
      const dateOption = document.querySelector('input[name="dateOption"]:checked').value;
      const mode = document.querySelector('input[name="mode"]:checked').value;
      const futureDate = datePicker.value || 'Today';

      console.log({
        deliveryOption, dateOption,
        deliveryDate: dateOption === 'later' ? futureDate : 'Today',
        mode,
        sender: {sFirst,sLast,sEmail},
        receiver: {rFirst,rLast,rEmail}
      });

      alert('✅ Submitted — check console for payload preview.');
    });

    const checkbox = document.getElementById("termsCheckbox");
const payBtn = document.getElementById("payBtn");

checkbox.addEventListener("change", () => {
  payBtn.disabled = !checkbox.checked;
});
