let uploadedVessels = [];

document.getElementById('vessel-form').addEventListener('submit', function(event) {
    event.preventDefault();
    uploadVessel();
});


function uploadVessel() {
    let vesselName = document.getElementById('vessel-name').value.trim();

    if (vesselName === '') {
        return;
    }

    uploadedVessels.push(vesselName);
    let uploadedVesselsDiv = document.getElementById('uploaded-vessels');
    let vesselElement = document.createElement('div');
    vesselElement.textContent = vesselName;
    uploadedVesselsDiv.appendChild(vesselElement);

    document.getElementById('vessel-name').value='';
}

function removeLastVessel() {
    if (uploadedVessels.length == 0)
        return;
    
    uploadedVessels.pop();
    let uploadedVesselsDiv = document.getElementById('uploaded-vessels');
    uploadedVesselsDiv.innerHTML = '';
    uploadedVessels.forEach(vessel => {
        let vesselElement = document.createElement('div');
        vesselElement.textContent = vessel;
        uploadedVesselsDiv.appendChild(vesselElement);
    });

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

    const uploadedVesselsDiv = document.getElementById('uploaded-vessels');
    uploadedVesselsDiv.innerHTML = '';

    savedVessels.forEach(vessel => {
        let vesselElement = document.createElement('div');
        vesselElement.textContent = vessel;
        uploadedVesselsDiv.appendChild(vesselElement);

    });
    
    createFinalVesselTable();
}

loadTableData();