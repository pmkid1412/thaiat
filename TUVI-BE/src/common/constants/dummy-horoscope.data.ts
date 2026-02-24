/**
 * Dummy horoscope data for Apple review bypass.
 * Content: generic self-help / wellness (no horoscope/astrology references).
 */

export const DUMMY_DAILY = {
    date: new Date().toISOString().split('T')[0],
    energy_score: 7,
    finance_bar: '▮▮▮▮▯▯',
    love_bar: '▮▮▮▮▮▯',
    health_bar: '▮▮▮▮▯▯',
    daily_quest:
        'Hôm nay hãy dành 10 phút thiền định buổi sáng và viết ra 3 điều biết ơn trong cuộc sống.',
    advice: {
        work: 'Hãy bắt đầu ngày mới bằng việc lên danh sách 3 việc quan trọng nhất cần hoàn thành. Tập trung vào từng việc một, tránh đa nhiệm để đạt hiệu suất cao nhất. Nếu gặp khó khăn, đừng ngại nhờ sự hỗ trợ từ đồng nghiệp hoặc cấp trên.\n\nBuổi chiều là thời điểm tốt để xử lý các cuộc họp và trao đổi công việc. Hãy giữ thái độ cởi mở và lắng nghe ý kiến của người khác. Sáng tạo và đổi mới sẽ giúp bạn nổi bật trong công việc.',
        love: 'Dành thời gian chất lượng cho người thân yêu. Một cuộc trò chuyện chân thành hoặc một bữa ăn cùng nhau có thể làm tăng sự gắn kết. Hãy thể hiện sự quan tâm bằng những hành động nhỏ nhưng ý nghĩa.\n\nNếu bạn đang độc thân, đây là lúc tốt để mở rộng giao tiếp xã hội. Tham gia các hoạt động cộng đồng hoặc sở thích cá nhân để gặp gỡ những người có cùng chí hướng.',
        health:
            'Uống đủ 2 lít nước mỗi ngày và ăn nhiều rau xanh, trái cây. Dành ít nhất 30 phút cho hoạt động thể chất như đi bộ, yoga hoặc bơi lội. Tránh thức khuya và giữ giấc ngủ đều đặn 7-8 tiếng.',
    },
};

export const DUMMY_MONTHLY = [
    {
        month: new Date().getMonth() + 1,
        solar_month: new Date().getMonth() + 1,
        theme: 'Phát triển bản thân và Cân bằng cuộc sống',
        affirmation:
            'Tôi đang phát triển mỗi ngày và xứng đáng với những điều tốt đẹp trong cuộc sống.',
        advice: {
            work: 'Tháng này hãy đặt ra 3 mục tiêu cụ thể, đo lường được cho sự nghiệp. Chia nhỏ mỗi mục tiêu thành các bước hành động cụ thể và theo dõi tiến độ hàng tuần. Đầu tư thời gian học hỏi kỹ năng mới — đọc sách chuyên ngành, tham gia khóa học online hoặc workshop để nâng cao chuyên môn.\n\nXây dựng các mối quan hệ có ý nghĩa trong công việc. Networking không chỉ là trao đổi danh thiếp mà còn là sự hỗ trợ và chia sẻ kinh nghiệm lẫn nhau. Hãy chủ động kết nối với những người bạn ngưỡng mộ trong lĩnh vực của mình.\n\nQuản lý tài chính cá nhân cẩn thận. Lập ngân sách chi tiêu hàng tháng, tiết kiệm ít nhất 20% thu nhập và tìm hiểu các kênh đầu tư an toàn, phù hợp với khả năng tài chính.',
            love: 'Dành nhiều thời gian hơn cho gia đình và người thân. Tổ chức những buổi gặp mặt gia đình, cùng nhau nấu ăn hoặc đi dạo cuối tuần. Những khoảnh khắc nhỏ nhưng đầy ý nghĩa sẽ tạo nên những kỷ niệm đẹp.\n\nTrong mối quan hệ đôi lứa, hãy tập trung vào giao tiếp hiệu quả. Lắng nghe chủ động, chia sẻ cảm xúc chân thành và tìm kiếm tiếng nói chung trong những vấn đề khác biệt. Sự đồng cảm và thấu hiểu là nền tảng của mọi mối quan hệ bền vững.\n\nNếu bạn đang tìm kiếm tình yêu, hãy kiên nhẫn và để mọi thứ diễn ra tự nhiên. Tập trung vào phát triển bản thân — khi bạn trở thành phiên bản tốt nhất của mình, bạn sẽ thu hút những người phù hợp.',
            health:
                'Xây dựng thói quen tập thể dục đều đặn, ít nhất 30 phút mỗi ngày. Kết hợp giữa cardio, yoga và các bài tập sức mạnh để cơ thể phát triển toàn diện. Ăn uống lành mạnh, hạn chế đồ ăn nhanh và thức uống có đường. Ngủ đủ giấc và quản lý stress bằng thiền, hít thở sâu hoặc sở thích cá nhân.',
        },
    },
];

export const DUMMY_LIFETIME_HTML = `
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Báo Cáo Phong Cách Sống</title>
    <style>
        body { font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; color: #333; margin: 0; padding: 16px; font-size: 15px; }
        h2 { color: #8B4513; margin-top: 24px; border-left: 4px solid #C0392B; padding-left: 10px; font-size: 17px; }
        h3 { color: #C0392B; font-size: 16px; margin-bottom: 4px; }
        .section { margin-bottom: 16px; }
        .palace { margin-bottom: 20px; padding: 12px; border-radius: 6px; }
        .analysis { margin-top: 6px; }
        strong, b { color: inherit; font-weight: 600; }
    </style>
</head>
<body>

<div class='section'>
<h2>TỔNG QUAN</h2>
<p>Bạn là người có tinh thần cầu tiến, luôn mong muốn phát triển bản thân và đóng góp cho xã hội. Với tính cách năng động và sáng tạo, bạn có khả năng thích nghi tốt với nhiều hoàn cảnh khác nhau. Điểm mạnh của bạn nằm ở khả năng giao tiếp, tư duy logic và tinh thần trách nhiệm cao.<br><br>Tuy nhiên, đôi khi bạn có thể quá cầu toàn hoặc đặt áp lực lên bản thân một cách không cần thiết. Hãy học cách cân bằng giữa công việc và cuộc sống, dành thời gian cho bản thân và những người thân yêu.</p>
</div>

<div class='section'>
<h2>PHÁT TRIỂN SỰ NGHIỆP</h2>

<div class='palace'>
<h3>Định hướng nghề nghiệp</h3>
<div class='analysis'>Bạn phù hợp với những công việc đòi hỏi sự sáng tạo, tư duy chiến lược và khả năng lãnh đạo. Các lĩnh vực như quản lý dự án, marketing, khởi nghiệp hoặc tư vấn đều có thể mang lại thành công cho bạn. Hãy tập trung phát triển kỹ năng mềm và xây dựng mạng lưới quan hệ chuyên nghiệp.</div>
</div>

<div class='palace'>
<h3>Quản lý tài chính</h3>
<div class='analysis'>Xây dựng thói quen tiết kiệm và đầu tư thông minh từ sớm. Lập ngân sách chi tiêu rõ ràng, phân bổ thu nhập hợp lý giữa chi tiêu, tiết kiệm và đầu tư. Tránh các quyết định tài chính mang tính bốc đồng, hãy nghiên cứu kỹ trước khi đưa ra bất kỳ cam kết tài chính nào.</div>
</div>

</div>

<div class='section'>
<h2>MỐI QUAN HỆ & GIA ĐÌNH</h2>

<div class='palace'>
<h3>Tình cảm & Hôn nhân</h3>
<div class='analysis'>Giao tiếp chân thành là chìa khóa của mọi mối quan hệ bền vững. Hãy dành thời gian lắng nghe và thấu hiểu đối phương, chia sẻ cảm xúc một cách cởi mở. Trong hôn nhân, sự tôn trọng và hỗ trợ lẫn nhau sẽ giúp cả hai vượt qua mọi thử thách.</div>
</div>

<div class='palace'>
<h3>Gia đình & Xã hội</h3>
<div class='analysis'>Gia đình luôn là chỗ dựa vững chắc nhất. Duy trì mối liên kết gia đình thông qua các hoạt động chung, sự quan tâm và hỗ trợ lẫn nhau. Trong xã hội, hãy tích cực tham gia các hoạt động cộng đồng để mở rộng mối quan hệ và đóng góp cho cộng đồng.</div>
</div>

</div>

<div class='section'>
<h2>SỨC KHỎE & LỐI SỐNG</h2>
<p>Sức khỏe là tài sản quý giá nhất. Xây dựng lối sống lành mạnh với chế độ ăn uống khoa học, tập thể dục đều đặn và nghỉ ngơi hợp lý. Thực hiện kiểm tra sức khỏe định kỳ 6 tháng/lần. Quản lý stress bằng thiền định, yoga hoặc các hoạt động giải trí lành mạnh.<br><br>Dành ít nhất 30 phút mỗi ngày cho hoạt động thể chất. Uống đủ 2-3 lít nước mỗi ngày. Hạn chế rượu bia, thuốc lá và các chất kích thích có hại cho sức khỏe.</p>
</div>

<div class='section'>
<h2>LỜI KHUYÊN & TỔNG KẾT</h2>
<p>Hãy sống chân thành với bản thân và theo đuổi đam mê một cách kiên trì. Mỗi ngày hãy dành thời gian suy ngẫm về mục tiêu cuộc sống, đánh giá tiến bộ và điều chỉnh khi cần thiết. Ba lời khuyên quan trọng:<br><br><b>1. Đầu tư vào bản thân:</b> Liên tục học hỏi, đọc sách, tham gia khóa học để phát triển kiến thức và kỹ năng.<br><br><b>2. Xây dựng thói quen tốt:</b> Dậy sớm, tập thể dục, thiền định, đọc sách — những thói quen nhỏ tạo nên sự thay đổi lớn.<br><br><b>3. Biết ơn và cho đi:</b> Mỗi ngày hãy viết ra 3 điều biết ơn và tìm cách giúp đỡ người khác. Hạnh phúc đến từ sự cho đi và lòng biết ơn.</p>
</div>

</body>
</html>
`;
