// Cấu trúc dữ liệu kịch bản tốt hơn (bao gồm đáp án và lý giải)
const scenariosData = [
    {
        scenario: "Email từ 'Ngân hàng ABC' báo tài khoản của bạn bị khóa tạm thời và yêu cầu đăng nhập qua link đính kèm để mở khóa ngay lập tức.",
        emotion: "Lo lắng",
        checksRequired: 5,
        decisionCorrect: "Báo cáo lừa đảo",
        explanation: "Đây là lừa đảo Phishing cổ điển. Ngân hàng không bao giờ yêu cầu đăng nhập qua email. Yêu cầu hành động gấp (ngay lập tức) là dấu hiệu cảnh báo mạnh nhất."
    },
    {
        scenario: "Tin nhắn SMS: 'Chúc mừng bạn đã trúng thưởng 500 triệu đồng từ chương trình tri ân khách hàng. Vui lòng truy cập đường link rút gọn sau để nhận giải.'",
        emotion: "Tham lam",
        checksRequired: 4,
        decisionCorrect: "Bỏ qua",
        explanation: "Bạn không tham gia chương trình nào. Đây là bẫy Tham Lam. Đường link rút gọn che giấu tên miền thật. Hành động an toàn là Bỏ qua/Xóa tin nhắn."
    },
    {
        scenario: "Bạn nhận cuộc gọi tự động (robot) nói rằng bạn có một gói hàng lớn không thể giao và yêu cầu bạn nhấn phím 1 để nói chuyện với nhân viên bưu điện.",
        emotion: "Bất ngờ",
        checksRequired: 3,
        decisionCorrect: "Bỏ qua",
        explanation: "Các dịch vụ bưu điện chính thức hiếm khi dùng cuộc gọi tự động cho các vấn đề nhạy cảm. Đây là một cuộc gọi lừa đảo Voice Phishing (Vishing). Hãy cúp máy và tự xác minh trên trang web chính thức."
    },
    {
        scenario: "Tin nhắn Zalo từ bạn cũ (tên hiển thị và ảnh đại diện đúng) hỏi mượn gấp 3 triệu đồng vì điện thoại bị hỏng, yêu cầu chuyển vào một số tài khoản lạ.",
        emotion: "Lo lắng",
        checksRequired: 5,
        decisionCorrect: "Xác minh thêm",
        explanation: "Tài khoản có thể bị hack (Impersonation). Bạn cần **Xác minh thêm** bằng cách gọi điện trực tiếp hoặc gặp mặt. Không chuyển tiền theo yêu cầu tin nhắn."
    },
    {
        scenario: "Email từ bộ phận 'HR công ty' với tiêu đề 'Cảnh báo: Lỗ hổng bảo mật' yêu cầu tất cả nhân viên phải cập nhật mật khẩu mới qua link đính kèm trong 30 phút.",
        emotion: "Sợ hãi",
        checksRequired: 5,
        decisionCorrect: "Xác minh thêm",
        explanation: "Yêu cầu hành động gấp + Thông tin nhạy cảm. Cần **Xác minh thêm** qua kênh chính thức (như điện thoại nội bộ hoặc gặp trực tiếp HR) trước khi click link."
    },
    {
        scenario: "Bạn nhận được email từ dịch vụ bạn đang dùng, báo đã xử lý thành công yêu cầu hủy đăng ký dịch vụ của bạn. Bạn không hề yêu cầu hủy.",
        emotion: "Bất ngờ",
        checksRequired: 4,
        decisionCorrect: "Xác minh thêm",
        explanation: "Tình huống này không chứa link hay yêu cầu hành động, nhưng gây bất ngờ. Nếu muốn an tâm, hãy tự vào trang web chính thức của dịch vụ để kiểm tra, không phản hồi email này."
    },
    // Thêm tình huống không phải lừa đảo để tăng tính thực tế
    {
        scenario: "Email từ một đối tác bạn vừa gặp yêu cầu bạn gửi lại file báo giá qua tệp đính kèm trong email này. Địa chỉ email trông chuyên nghiệp và đúng tên.",
        emotion: "Nghi ngờ",
        checksRequired: 3,
        decisionCorrect: "Thực hiện theo yêu cầu",
        explanation: "Đây là tình huống công việc hợp lệ. Cần kiểm tra người gửi và không có yêu cầu hành động đáng ngờ. Đáp án là **Thực hiện theo yêu cầu** (chuyển file), sau khi đã kiểm tra an toàn."
    },
{
    scenario: "Cửa sổ pop-up bất ngờ xuất hiện trên màn hình máy tính của bạn với thông báo đỏ: 'Cảnh báo! Máy tính của bạn đã bị nhiễm virus nặng! Vui lòng gọi ngay số 1800-XXX-XXX để được hỗ trợ kỹ thuật MIỄN PHÍ.'",
        emotion: "Sợ hãi",
            checksRequired: 5,
                decisionCorrect: "Báo cáo lừa đảo",
                    explanation: "Đây là lừa đảo Hỗ trợ Kỹ thuật (Tech Support Scam). Các công ty phần mềm lớn không bao giờ gửi cảnh báo qua pop-up như vậy. Hành động đúng là đóng trình duyệt hoặc rút dây mạng và báo cáo."
},
{
    scenario: "Email từ một nhà cung cấp bạn thường xuyên giao dịch, nhưng địa chỉ email có một lỗi chính tả nhỏ (ví dụ: 'supplier@companyy.com' thay vì 'supplier@company.com'). Email yêu cầu bạn thanh toán hóa đơn mới nhất vào một tài khoản ngân hàng khác.",
        emotion: "Lo lắng",
            checksRequired: 5,
                decisionCorrect: "Xác minh thêm",
                    explanation: "Lỗi chính tả nhỏ trong email và thay đổi thông tin ngân hàng là dấu hiệu của lừa đảo hóa đơn (Invoice Fraud). Cần **Xác minh thêm** qua số điện thoại hoặc email đã biết trước đó."
},
{
    scenario: "Quảng cáo trên Facebook: 'Cơ hội đầu tư tiền ảo sinh lời 500% chỉ trong 7 ngày! Tham gia nhóm Zalo VIP ngay để được chuyên gia dẫn dắt.'",
        emotion: "Tham lam",
            checksRequired: 4,
                decisionCorrect: "Bỏ qua",
                    explanation: "Lợi nhuận phi thực tế là dấu hiệu rõ ràng của lừa đảo đầu tư/Ponzi. **Bỏ qua** và chặn quảng cáo là hành động an toàn nhất."
},
{
    scenario: "Tin nhắn Messenger từ một người lạ, gửi một đường link và nói: 'Nhìn này, đây là bức ảnh nhạy cảm về bạn mà tôi tìm thấy trên mạng xã hội!'",
        emotion: "Bất ngờ",
            checksRequired: 5,
                decisionCorrect: "Báo cáo lừa đảo",
                    explanation: "Đây là chiêu trò Phishing hoặc phát tán Malware. Không bao giờ click vào link từ người lạ hoặc tin nhắn có nội dung gây sốc. **Báo cáo** tài khoản này."
},
{
    scenario: "Email từ cơ quan Thuế: 'Hồ sơ thuế của bạn có sai sót nghiêm trọng. Bạn phải chuyển khoản phạt 5 triệu VND qua thẻ quà tặng Google Play trong vòng 2 giờ nếu không muốn bị khởi tố.'",
        emotion: "Sợ hãi",
            checksRequired: 5,
                decisionCorrect: "Báo cáo lừa đảo",
                    explanation: "Cơ quan nhà nước không bao giờ yêu cầu thanh toán qua thẻ quà tặng, Bitcoin hay yêu cầu khẩn cấp. Đây là lừa đảo mạo danh (Impersonation Scam). **Báo cáo** ngay."
},
{
    scenario: "Bạn nhận được thông báo từ ứng dụng ngân hàng chính thức (không phải tin nhắn hay email) về việc cập nhật chính sách bảo mật, yêu cầu bạn xem thông tin chi tiết ngay trên ứng dụng.",
        emotion: "Nghi ngờ",
            checksRequired: 1,
                decisionCorrect: "Thực hiện theo yêu cầu",
                    explanation: "Thông báo này được nhận trong môi trường an toàn (ứng dụng chính thức). Chỉ cần kiểm tra nhanh (người gửi: Ngân hàng) và **Thực hiện theo yêu cầu** là an toàn."
},
{
    scenario: "Tin nhắn SMS từ số điện thoại lạ: 'Tài khoản Viettel/Mobifone của bạn đã hết hạn khuyến mãi. Vui lòng nạp tiền ngay để tiếp tục sử dụng dịch vụ tốc độ cao.'",
        emotion: "Lo lắng",
            checksRequired: 4,
                decisionCorrect: "Xác minh thêm",
                    explanation: "Nội dung mập mờ, không rõ ràng về chương trình khuyến mãi. **Xác minh thêm** bằng cách tự gọi lên tổng đài chính thức của nhà mạng để kiểm tra gói cước."
},
{
    scenario: "Bạn đang xem video trên YouTube thì xuất hiện một bình luận của một người lạ, nói rằng họ đã hack được tài khoản của bạn và yêu cầu bạn gửi email để 'thương lượng' tiền chuộc.",
        emotion: "Sợ hãi",
            checksRequired: 5,
                decisionCorrect: "Bỏ qua",
                    explanation: "Đây là chiêu hăm dọa tống tiền đơn giản (Extortion/Scareware). Kẻ lừa đảo thường không có bằng chứng. Hành động tốt nhất là **Bỏ qua**, báo cáo bình luận và thay đổi mật khẩu email/YouTube như biện pháp phòng ngừa."
}
];

let sessionScenarios = []; // Mảng chứa 7 kịch bản cho phiên chơi hiện tại
const MAX_SCENARIOS = 7; // Giới hạn 7 câu hỏi

let current = 0, score = 0, scamScore = 0, leaderboard = [];

// --- HÀM KHỞI ĐỘNG/RESET ---

function runDemo() {
    // Trộn toàn bộ danh sách kịch bản
    scenariosData.sort(() => Math.random() - 0.5);

    // Chọn đúng 7 kịch bản đầu tiên
    sessionScenarios = scenariosData.slice(0, MAX_SCENARIOS);

    current = 0;
    score = 0;
    scamScore = 0;

    clearInputs();
    loadScenario(); // <<< sẽ load từ sessionScenarios
    document.getElementById("result").innerText = "";
    document.getElementById("explanation").innerText = "";
    updateScore();
}


function resetGame() { runDemo(); }

// --- CÁC HÀM CƠ BẢN ---

function clearInputs() {
    // 1. Đặt lại giá trị và mở khóa cho Select Box Cảm Xúc
    const emoEl = document.getElementById("emotion");
    if (emoEl) {
        emoEl.value = "";
        emoEl.disabled = false; // <<< Đã thêm: Đảm bảo mở khóa
    }

    // 2. Đặt lại giá trị và mở khóa cho Select Box Quyết Định
    const decisionEl = document.getElementById("decision");
    if (decisionEl) {
        decisionEl.value = "";
        decisionEl.disabled = false; // <<< Đã thêm: Đảm bảo mở khóa
    }

    // 3. Đặt lại trạng thái và mở khóa cho Checkbox
    document.querySelectorAll(".check").forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false; // <<< Đã thêm: Đảm bảo mở khóa
    });

    // 4. Mở khóa nút Submit (nằm trong .btn-group)
    const submitBtn = document.querySelector('.btn-group .btn');
    if (submitBtn) submitBtn.disabled = false; // <<< Đã thêm: Đảm bảo mở khóa

    // 5. Xóa nút "Câu tiếp theo"
    document.getElementById("next-btn-container").innerHTML = "";

    // 6. Xóa kết quả/giải thích cũ
    document.getElementById("result").innerText = "";
    document.getElementById("explanation").innerText = "";
}

function updateScore() {
    document.getElementById("score").innerText = `Điểm: ${score} | Lỗi: ${scamScore}`;
}

function toggleHint() {
    alert("Quy tắc 3-5-1: \n1. Xác định cảm xúc trong 3 giây (Sợ hãi, Tham lam, Lo lắng)\n2. Kiểm tra 5 bước (Link, Người gửi, Hành động gấp, Chính tả, Bất thường)\n3. Đưa ra 1 quyết định an toàn (Báo cáo, Xác minh, Bỏ qua)");
}

function loadScenario() {
    if (current >= sessionScenarios.length) return;

    const currentData = sessionScenarios[current];
    document.getElementById("scenario").innerText = currentData.scenario;

    const progress = ((current + 1) / sessionScenarios.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-text").innerText =
        `Bài ${current + 1} / ${sessionScenarios.length}`;

    // Animation fade in
    document.querySelectorAll(".fade").forEach(el => el.style.opacity = 0);
    setTimeout(() => { document.querySelectorAll(".fade").forEach(el => el.style.opacity = 1); }, 50);

    // Xóa kết quả/giải thích cũ
    document.getElementById("result").innerText = "";
    document.getElementById("explanation").innerText = "";
}


// --- HÀM XỬ LÝ ĐÁP ÁN ---

// --- HÀM XỬ LÝ ĐÁP ÁN (ĐÃ SỬA LỖI KHÓA INPUT KHI THIẾU THÔNG TIN) ---
function submitAnswers() {
    const currentData = sessionScenarios[current];
    const emo = document.getElementById("emotion").value;
    const checks = document.querySelectorAll(".check:checked").length;
    const decision = document.getElementById("decision").value;

    const soundCorrect = document.getElementById("sound-correct");
    const soundWrong = document.getElementById("sound-wrong");

    // Lấy nút submit
    const submitBtn = document.querySelector('.btn-group .btn');

    // Khóa tất cả các nút và input sau khi nộp
    document.querySelectorAll('select, input[type="checkbox"]').forEach(el => el.disabled = true);
    if (submitBtn) submitBtn.disabled = true;

    // 1. Kiểm tra điều kiện làm bài tối thiểu
    if (!emo || checks < 1 || !decision) {
        document.getElementById("result").innerText = "⚠️ Làm chưa đủ, vui lòng chọn ít nhất 1 cảm xúc, 1 bước kiểm tra, và 1 quyết định.";
        if (soundWrong) soundWrong.play();
        scamScore += 1; updateScore();

        // <<< FIX QUAN TRỌNG: Mở khóa lại input và nút submit để người dùng có thể thử lại
        document.querySelectorAll('select, input[type="checkbox"]').forEach(el => el.disabled = false);
        if (submitBtn) submitBtn.disabled = false;

        return; // Dừng hàm tại đây
    }

    // 2. Kiểm tra đáp án (Chỉ chạy khi đã đủ thông tin)
    // 2. Kiểm tra đáp án

    // a. Kiểm tra quyết định
    // Thêm .trim() để loại bỏ mọi khoảng trắng dư thừa
    const isCorrectDecision = (decision.trim() === currentData.decisionCorrect.trim());
    // b. Kiểm tra số bước
    const isEnoughChecks = (checks >= currentData.checksRequired);

    if (isCorrectDecision && isEnoughChecks) {
        // ĐÚNG HOÀN TOÀN
        document.getElementById("result").innerHTML = "✔️ **TỐT!** Phân tích và quyết định hoàn toàn chính xác.";
        document.getElementById("explanation").innerHTML = `**Giải thích:** ${currentData.explanation}`;
        if (soundCorrect) soundCorrect.play();
        score += 15;
        confetti({ particleCount: 60, spread: 120, origin: { y: 0.6 }, colors: ['#00aaff', '#00ccff', '#0099ff'] });
    } else {
        // SAI HOẶC CHƯA ĐỦ TỐT
        let resultMsg = "❌ **SAI/CHƯA ĐỦ!** ";

        // 1. Xử lý lỗi Quyết định sai (Lỗi lớn)
        if (!isCorrectDecision) {
            resultMsg += `Quyết định sai! Hành động đúng phải là **${currentData.decisionCorrect}**. `;
            scamScore += 2;
        }

        // 2. Xử lý lỗi Thiếu kiểm tra (Lỗi nhỏ)
        // Chỉ chạy nếu quyết định đúng (TRUE) nhưng checks không đủ (FALSE)
        if (isCorrectDecision && !isEnoughChecks) {
            resultMsg += `Quyết định đúng, nhưng bạn cần ít nhất ${currentData.checksRequired} bước kiểm tra để chắc chắn (bạn đã chọn ${checks} bước). `;
            scamScore += 1;
        }

        // 3. Xử lý lỗi khi Quyết định sai VÀ thiếu checks: 
        // Lỗi quyết định đã được thông báo ở bước 1, không cần thông báo lỗi checks nữa.

        document.getElementById("result").innerHTML = resultMsg;
        document.getElementById("explanation").innerHTML = `**Giải thích:** ${currentData.explanation}`;
        if (soundWrong) soundWrong.play();
        confetti({ particleCount: 40, startVelocity: 20, spread: 90, origin: { y: 0.6 }, colors: ['#ff0000', '#ff5555'] });
    }

    // ... (Phần còn lại của submitAnswers)

    updateScore();
    addNextButton();
}
// --- HÀM HỖ TRỢ CHUYỂN BÀI ---

function addNextButton() {
    const nextContainer = document.getElementById("next-btn-container");
    nextContainer.innerHTML = "";

    const nextBtn = document.createElement("button");
    nextBtn.innerText = current < sessionScenarios.length - 1 ? "Câu tiếp theo" : "Hoàn thành Luyện Tập";
    nextBtn.className = "btn";
    nextBtn.onclick = () => {
        // Mở lại các nút đã khóa
        document.querySelectorAll('select, input[type="checkbox"]').forEach(el => el.disabled = false);
        document.querySelector('.btn-group .btn').disabled = false;

        current++;
        if (current < sessionScenarios.length) {
            clearInputs();
            loadScenario();
        } else {
            document.getElementById("result").innerHTML = "🎉 **HOÀN TẤT!**";
            document.getElementById("explanation").innerText = "";
            updateLeaderboard();
        }
    };
    nextContainer.appendChild(nextBtn);
}


// --- HÀM LEADERBOARD VÀ MODAL ---

function updateLeaderboard() {
    // Tạm lưu điểm vào Local Storage (cần nâng cấp để lưu trữ lâu dài hơn)
    const playerName = prompt("Nhập tên của bạn để lưu điểm vào Bảng xếp hạng:", "Anonymous");
    if (playerName) {
        leaderboard.push({ name: playerName, finalScore: score, attempts: scamScore });
    } else {
        leaderboard.push({ name: 'Vô danh', finalScore: score, attempts: scamScore });
    }

    // Sắp xếp: ưu tiên điểm cao hơn, nếu bằng điểm thì ưu tiên số lỗi (Scam Score) thấp hơn
    leaderboard.sort((a, b) => {
        if (b.finalScore !== a.finalScore) {
            return b.finalScore - a.finalScore;
        }
        return a.attempts - b.attempts;
    });

    const listEl = document.getElementById("leaderboard-list");
    listEl.innerHTML = '';

    leaderboard.slice(0, 10).forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${index + 1}. ${item.name}</strong>: ${item.finalScore} điểm (Lỗi: ${item.attempts})`;
        listEl.appendChild(li);
    });

    // Hiển thị modal chúc mừng
    document.getElementById("badge-text").innerHTML = `Bạn đã hoàn thành ${sessionScenarios.length} bài tập! <br>Tổng điểm: **${score}**, Số lỗi: **${scamScore}**.<br> Kết quả của bạn đã được cập nhật lên BXH!`;
    document.getElementById("badge-modal").style.display = "block";
}

function closeBadge() {
    document.getElementById("badge-modal").style.display = "none";

}
// Hệ thống huy hiệu
const badgeSystem = {
    badges: [
        { id: 1, name: "🔰 Người Mới", description: "Hoàn thành bài tập đầu tiên", earned: false },
        { id: 2, name: "🛡️ Cảnh Giác", description: "Đạt 100 điểm", earned: false },
        { id: 3, name: "🎯 Chính Xác", description: "Trả lời đúng 5 câu liên tiếp", earned: false },
        { id: 4, name: "🚀 Tốc Độ", description: "Hoàn thành 7 bài trong 10 phút", earned: false },
        { id: 5, name: "💎 Chuyên Gia", description: "Đạt 200 điểm với ít hơn 10 lỗi", earned: false }
    ],

    checkBadges: function(score, scamScore, consecutiveCorrect) {
        const newBadges = [];
        
        // Người mới
        if (score >= 15 && !this.badges[0].earned) {
            this.badges[0].earned = true;
            newBadges.push(this.badges[0]);
        }
        
        // Cảnh giác
        if (score >= 100 && !this.badges[1].earned) {
            this.badges[1].earned = true;
            newBadges.push(this.badges[1]);
        }
        
        // Chính xác
        if (consecutiveCorrect >= 5 && !this.badges[2].earned) {
            this.badges[2].earned = true;
            newBadges.push(this.badges[2]);
        }
        
        // Chuyên gia
        if (score >= 200 && scamScore < 10 && !this.badges[4].earned) {
            this.badges[4].earned = true;
            newBadges.push(this.badges[4]);
        }
        
        return newBadges;
    },

    showBadgeNotification: function(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.innerHTML = `
            <h3>🎉 Đạt được huy hiệu mới!</h3>
            <strong>${badge.name}</strong>
            <p>${badge.description}</p>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    },

    displayBadges: function() {
        const badgeContainer = document.getElementById('badge-container');
        if (!badgeContainer) return;
        
        badgeContainer.innerHTML = this.badges.map(badge => `
            <div class="badge-item ${badge.earned ? 'earned' : 'locked'}">
                <div class="badge-icon">${badge.earned ? badge.name.split(' ')[0] : '🔒'}</div>
                <div class="badge-info">
                    <strong>${badge.name}</strong>
                    <p>${badge.description}</p>
                </div>
            </div>
        `).join('');
    }
};
