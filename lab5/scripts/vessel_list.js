let uploadedVessels = [];

document.getElementById('vessel-form').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadVessel();
});


function uploadVessel() {
    let vesselName = document.getElementById('vessel-name').value.trim();

    if (vesselName === '') {
        window.alert('Введите название судна');
        return;
    }

    uploadedVessels.push(vesselName);

    document.getElementById('vessel-name').value='';

    let finalTable = document.getElementById('final-vessel-tabel');
    let tableBody = finalTable.querySelector('tbody');

    let newRow = tableBody.insertRow();
    let nameCell = newRow.insertCell(0);
    nameCell.textContent = vesselName;

    finalTable.style.display = 'table';
}

function removeLastVessel() {
    if (uploadedVessels.length == 0) {
        return;
    }
        
    uploadedVessels.pop();

    let finalTable = document.getElementById('final-vessel-tabel');
    let tableBody = finalTable.querySelector('tbody');

    tableBody.innerHTML = '';

    uploadedVessels.forEach(vessel => {
        let newRow = tableBody.insertRow();
        let nameCell = newRow.insertCell(0);
        nameCell.textContent = vessel;
    });

    finalTable.style.display = 'table';

    if (uploadedVessels.length == 0)
        finalTable.style.display = 'none';

}

function removeAllVessels() {
    uploadedVessels = [];
    document.getElementById('final-vessel-tabel').querySelector('tbody').innerHTML = '';
    document.getElementById('final-vessel-tabel').style.display = 'none';
}

function createFinalVesselTable() {
    let finalTable = document.getElementById('final-vessel-tabel');
    let tableBody = finalTable.querySelector('tbody');

    tableBody.innerHTML = '';

    uploadedVessels.forEach(vessel => {
        let newRow = tableBody.insertRow();
        let nameCell = newRow.insertCell(0);
        nameCell.textContent = vessel;
    });

    finalTable.style.display = 'table';
    saveVesselTable();
}

function saveVesselTable() {
    localStorage.setItem('uploadedVessels', JSON.stringify(uploadedVessels));
}

function loadTableData() {
    let savedVessels = JSON.parse(localStorage.getItem('uploadedVessels')) || [];
    uploadedVessels = savedVessels;

    if (savedVessels.length == 0) {
        return;
    }    
    createFinalVesselTable();
}

loadTableData();