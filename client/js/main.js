document.addEventListener('DOMContentLoaded', () => {
    loadEstimates();

    // 모달 관련 요소
    const modal = document.getElementById('estimateDetail');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

async function loadEstimates() {
    try {
        const response = await fetch('/api/estimates');
        const estimates = await response.json();
        
        const tbody = document.querySelector('#estimatesTable tbody');
        tbody.innerHTML = '';

        estimates.forEach(estimate => {
            const customerInfo = JSON.parse(estimate.customer_info);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${estimate.id}</td>
                <td>${customerInfo.name}</td>
                <td>${JSON.parse(estimate.funeral_info).name}</td>
                <td>${estimate.total_price.toLocaleString()}원</td>
                <td>${new Date(estimate.created_at).toLocaleString()}</td>
                <td><button onclick="showEstimateDetail(${estimate.id})">상세보기</button></td>
            `;
            
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('견적서 목록 로딩 실패:', error);
    }
}

async function showEstimateDetail(id) {
    try {
        const response = await fetch(`/api/estimates/${id}`);
        const estimate = await response.json();
        
        const detailContent = document.getElementById('detailContent');
        const customerInfo = JSON.parse(estimate.customer_info);
        const funeralInfo = JSON.parse(estimate.funeral_info);
        const tombstoneInfo = JSON.parse(estimate.tombstone_info);

        detailContent.innerHTML = `
            <div class="detail-section">
                <h3>고객 정보</h3>
                <p>이름: ${customerInfo.name}</p>
                <p>연락처: ${customerInfo.phone}</p>
                <p>주소: ${customerInfo.address}</p>
            </div>
            <div class="detail-section">
                <h3>장례식장 정보</h3>
                <p>장례식장: ${funeralInfo.name}</p>
                <p>위치: ${funeralInfo.location}</p>
            </div>
            <div class="detail-section">
                <h3>비석 정보</h3>
                <p>종류: ${tombstoneInfo.type}</p>
                <p>크기: ${tombstoneInfo.size}</p>
            </div>
            <div class="detail-section">
                <h3>견적 금액</h3>
                <p>총 금액: ${estimate.total_price.toLocaleString()}원</p>
            </div>
        `;

        document.getElementById('estimateDetail').style.display = "block";
    } catch (error) {
        console.error('견적서 상세 정보 로딩 실패:', error);
    }
} 