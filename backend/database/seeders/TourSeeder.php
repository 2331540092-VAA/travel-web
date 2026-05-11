<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        // Reset tours + bảng con để tránh lệch ID làm tour không map được giá khởi hành.
        DB::statement('TRUNCATE TABLE tours RESTART IDENTITY CASCADE');

        $locationNameByLegacyId = [
            1 => 'Bà Nà Hills',
            3 => 'Hồ Gươm',
            6 => 'Vịnh Hạ Long',
            9 => 'Grand Palace',
            11 => 'Phuket Beach',
            15 => 'Vientiane',
            18 => 'Angkor Wat',
            21 => 'Bali',
            25 => 'Tokyo',
            26 => 'Kyoto',
            32 => 'Merlion Park',
            35 => 'Vạn Lý Trường Thành',
            39 => 'Seoul',
            41 => 'Jeju Island',
        ];

        $tours = [
            [
                'location_id' => 1,
                'name' => 'Tour Đà Nẵng 3N2Đ: Đường lên Tiên Cảnh',
                'days' => 3,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Khám phá Đà Nẵng - Hội An trong hành trình ngắn ngày nhưng đủ điểm nhấn, kết hợp giữa cảnh quan nổi tiếng, trải nghiệm cáp treo Bà Nà Hills và nhịp sống biển miền Trung rất dễ tiếp cận với nhiều nhóm khách.',
                'content' => 'Hành trình đưa quý khách đến với thành phố đáng sống nhất Việt Nam, nơi vừa có nhịp sống trẻ trung hiện đại vừa có chiều sâu văn hóa và cảnh quan thiên nhiên nổi bật. Tour tập trung vào các điểm giàu sức hút như Bà Nà Hills với hệ thống cáp treo ấn tượng, Cầu Vàng biểu tượng của du lịch Đà Nẵng, Ngũ Hành Sơn hùng vĩ và phố cổ Hội An lung linh khi lên đèn. Bên cạnh các điểm check-in nổi tiếng, chương trình vẫn giữ nhịp độ vừa phải để du khách có thời gian tận hưởng không khí biển, thưởng thức ẩm thực địa phương và cảm nhận rõ sức hút của miền Trung trong một lịch trình gọn nhưng không vội.',
                'combo_content' => 'Vé máy bay khứ hồi, khách sạn 4 sao gần biển, 02 bữa sáng buffet, xe đưa đón đời mới, vé cáp treo Bà Nà Hills, hướng dẫn viên theo đoàn, nước suối trên xe và các dịch vụ cơ bản phù hợp cho hành trình nghỉ dưỡng kết hợp tham quan ngắn ngày.',
                'image_url' => 'https://hoangphuan.com/wp-content/uploads/2024/06/tour-du-lich-da-nang-1.jpg',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 3,
                'name' => 'Tour Hà Nội: Hào khí Thăng Long',
                'days' => 2,
                'transport' => 'Xe khách',
                'departure_location' => 'Hải Phòng',
                'description' => 'Tham quan thủ đô nghìn năm văn hiến qua những điểm đến giàu giá trị lịch sử, văn hóa và ẩm thực, phù hợp cho khách muốn có chuyến đi ngắn nhưng vẫn cảm nhận rõ chất Hà Nội.',
                'content' => 'Tour đưa du khách chạm vào phần tinh thần rõ nhất của Hà Nội qua các địa danh quen thuộc nhưng luôn có sức hút riêng như Lăng Bác, Văn Miếu Quốc Tử Giám, Hồ Gươm và khu phố cổ. Không chỉ tham quan, hành trình còn tạo không gian để du khách cảm nhận nhịp sống Hà thành qua trải nghiệm xích lô, các món ăn đặc trưng như phở, bún chả và những buổi tối dạo quanh khu trung tâm. Với thời lượng gọn, lịch trình này đặc biệt phù hợp cho khách đoàn, gia đình hoặc nhóm bạn muốn đổi gió cuối tuần mà vẫn có được cảm giác đủ đầy về văn hóa, ẩm thực và lịch sử.',
                'combo_content' => 'Xe Limousine đưa đón hai chiều, khách sạn trung tâm phố cổ, 01 bữa tối đặc sản Hà Nội, hướng dẫn viên suốt tuyến, nước suối trên xe và các dịch vụ cơ bản giúp chuyến city tour ngắn ngày trở nên thuận tiện và dễ đi hơn.',
                'image_url' => 'https://travel-bus-files.s3.ap-southeast-1.amazonaws.com/images/9558e8f5-7dc4-4b7a-9b3c-a1e7b4cdedb0.jpeg',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 9,
                'name' => 'Tour Bangkok - Pattaya: Xứ sở Chùa Vàng',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Hành trình Thái Lan sôi động kết hợp giữa tham quan biểu tượng văn hóa, giải trí hiện đại, show diễn đặc sắc và các khu mua sắm nổi tiếng, rất phù hợp với khách đi tour nước ngoài lần đầu.',
                'content' => 'Tour kết nối hai sắc thái rất khác nhau của Thái Lan: Bangkok náo nhiệt, giàu màu sắc văn hóa và Pattaya sôi động với không khí nghỉ dưỡng ven biển. Trong hành trình, du khách sẽ ghé thăm Chùa Phật Ngọc, Cung điện Hoàng Gia, dạo thuyền trên sông Chao Phraya, trải nghiệm các khu mua sắm lớn và thưởng thức những show diễn đặc trưng của du lịch Thái. Lịch trình được thiết kế theo hướng dễ đi, nhiều điểm nổi bật, ít rỗng thời gian nên rất thích hợp cho khách thích chụp ảnh, khám phá và kết hợp mua sắm trong cùng một chuyến đi.',
                'combo_content' => 'Vé máy bay khứ hồi, khách sạn 4-5 sao, buffet tối tại tòa nhà Baiyoke Sky, xe đưa đón theo chương trình, hướng dẫn viên, bảo hiểm du lịch quốc tế, nước suối trên xe và các dịch vụ cơ bản để hành trình Thái Lan diễn ra thuận tiện hơn.',
                'image_url' => 'https://vietlandtravel.vn/upload/img/products/27122025/bangkok-pattaya.png',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 32,
                'name' => 'Tour Singapore: Đảo quốc Sư Tử',
                'days' => 3,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Khám phá quốc đảo Singapore hiện đại, sạch đẹp và rất thuận tiện cho du lịch ngắn ngày, với sự kết hợp hài hòa giữa kiến trúc tương lai, không gian xanh và các điểm vui chơi giải trí nổi tiếng.',
                'content' => 'Singapore là điểm đến lý tưởng cho khách muốn đi tour nước ngoài ngắn ngày nhưng vẫn nhiều trải nghiệm. Hành trình tập trung vào những biểu tượng nổi bật nhất của đảo quốc như Gardens by the Bay, Marina Bay, Merlion Park và Universal Studios, đồng thời để lại thời gian cho mua sắm, dạo phố và khám phá nhịp sống đô thị rất ngăn nắp, hiện đại. Tour phù hợp cho cả nhóm bạn, gia đình lẫn khách doanh nghiệp vì lịch trình gọn, di chuyển thuận tiện, ít mệt và luôn có nhiều góc check-in mang tính biểu tượng.',
                'combo_content' => 'Vé máy bay khứ hồi, khách sạn gần trung tâm, vé vào cổng các điểm tham quan theo chương trình, sim 4G Singapore, xe đưa đón sân bay, hướng dẫn viên hỗ trợ và các dịch vụ cơ bản phù hợp cho chuyến đi city break quốc tế ngắn ngày.',
                'image_url' => 'https://havatravel.vn/upload/hinhthem/imagedulichsingaporevoinhungdiemthamquanvuichoimienphi165237552751402-8243.jpeg',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 21,
                'name' => 'Tour Bali: Thiên đường nhiệt đới',
                'days' => 5,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Hành trình nghỉ dưỡng tại hòn đảo xinh đẹp Bali, nơi biển xanh, ruộng bậc thang, đền đài và văn hóa bản địa hòa quyện thành một trải nghiệm rất phù hợp cho khách thích du lịch chậm và nhiều ảnh đẹp.',
                'content' => 'Tour Bali được xây dựng theo hướng cân bằng giữa nghỉ dưỡng và tham quan, giúp du khách cảm nhận rõ sức hút của hòn đảo nổi tiếng nhất Indonesia. Từ cổng trời Lempuyang, Bali Swing, ruộng bậc thang Tegalalang đến đền Tanah Lot và bãi biển Jimbaran, mỗi điểm dừng đều mang màu sắc rất riêng của Bali: vừa thiêng liêng, vừa thơ mộng, vừa phóng khoáng. Bên cạnh các điểm check-in biểu tượng, chương trình còn tạo khoảng thời gian để du khách thư giãn trong resort, thưởng thức ẩm thực địa phương, dạo biển và tận hưởng không khí nhiệt đới rất đặc trưng của đảo ngọc.',
                'combo_content' => 'Vé máy bay khứ hồi, resort có hồ bơi, xe riêng tham quan suốt hành trình, buffet sáng mỗi ngày, 01 bữa tối lãng mạn trên bãi biển, hướng dẫn viên hỗ trợ theo chương trình và các tiện ích cơ bản để chuyến nghỉ dưỡng thêm trọn vẹn.',
                'image_url' => 'https://toptentravel.com.vn/Data/Sites/1/News/4528/kham-pha-bali-thien-duong-du-lich-nhiet-doi-cua-indonesia-2.png',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 25,
                'name' => 'Tour Tokyo: Hiện đại và Truyền thống',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'Hà Nội',
                'description' => 'Khám phá Tokyo sầm uất trong hành trình kết hợp hài hòa giữa đời sống đô thị hiện đại, các khu mua sắm nổi tiếng và biểu tượng thiên nhiên đặc sắc là núi Phú Sĩ.',
                'content' => 'Tour đưa du khách đi qua hai lát cắt rất đặc trưng của Nhật Bản: một Tokyo sôi động, hiện đại, ngăn nắp và một vùng ngoại ô thanh bình dưới chân núi Phú Sĩ. Du khách sẽ ghé thăm đền Senso-ji cổ kính, khu vực Shibuya nhộn nhịp, các điểm tham quan tiêu biểu của thủ đô và tiếp tục hành trình đến Oshino Hakkai để ngắm nhìn vẻ đẹp biểu tượng của Phú Sĩ trong một khung cảnh thanh tĩnh hơn. Đây là lịch trình vừa dễ bán, vừa phù hợp nhiều nhóm khách vì có đủ tham quan, chụp ảnh, mua sắm và trải nghiệm văn hóa Nhật.',
                'combo_content' => 'Visa Nhật Bản, khách sạn tiêu chuẩn Nhật, vé tàu hoặc phương tiện nội đô trải nghiệm, buffet sáng, bữa tối với lẩu Shabu Shabu, hướng dẫn viên hỗ trợ suốt tuyến và các dịch vụ cơ bản phục vụ hành trình khám phá Tokyo - Phú Sĩ.',
                'image_url' => 'https://bizweb.dktcdn.net/100/514/927/files/khi-anh-den-chua-bao-gio-tat-tai-shibuya-1682866202-7d6ef46b-0a18-4d90-b5b3-73c63c8f52b5.jpg?v=1756891289107',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 39,
                'name' => 'Tour Seoul - Nami: Bản tình ca mùa đông',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'Hà Nội',
                'description' => 'Du lịch Hàn Quốc theo phong cách lãng mạn và dễ tiếp cận, kết hợp giữa các biểu tượng văn hóa Seoul, không gian thơ mộng của đảo Nami và những trải nghiệm rất đặc trưng của xứ kim chi.',
                'content' => 'Hành trình này phù hợp cho những ai muốn cảm nhận Hàn Quốc qua cả hai màu sắc nổi bật nhất: Seoul hiện đại nhưng vẫn đậm chất lịch sử, và đảo Nami lãng mạn, giàu cảm xúc. Du khách sẽ khám phá cung điện Gyeongbokgung, làng Bukchon Hanok, trải nghiệm mặc Hanbok, làm Kimchi, vui chơi tại công viên Everland và dành trọn một ngày để dạo bước trên những con đường nổi tiếng ở Nami. Đây là tour dễ tạo cảm xúc, đặc biệt phù hợp với khách gia đình, cặp đôi hoặc những người yêu thích văn hóa Hàn qua phim ảnh và các điểm check-in biểu tượng.',
                'combo_content' => 'Visa Hàn Quốc, khách sạn 4 sao, lớp học làm Kimchi và mặc Hanbok, vé vào cổng các khu vui chơi theo chương trình, xe đưa đón, hướng dẫn viên và các dịch vụ cơ bản cho hành trình Hàn Quốc ngắn ngày nhiều trải nghiệm.',
                'image_url' => 'https://booking.dulichthiennhien.vn/Data/image/TIN%20T%E1%BB%A8C%20DU%20L%E1%BB%8ACH/92/nami-island-winter.jpg',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 35,
                'name' => 'Tour Bắc Kinh: Vẻ đẹp vĩnh cửu',
                'days' => 5,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Hành trình khám phá Bắc Kinh với trọng tâm là các biểu tượng lịch sử, kiến trúc hoàng gia và văn hóa Trung Hoa cổ điển, phù hợp cho khách thích tour có chiều sâu tham quan.',
                'content' => 'Tour Bắc Kinh đưa du khách đến với một trong những thành phố có bề dày lịch sử mạnh nhất châu Á. Những điểm dừng như Vạn Lý Trường Thành, Tử Cấm Thành, Di Hòa Viên hay quảng trường trung tâm không chỉ có giá trị check-in mà còn tạo cảm giác rõ rệt về quy mô, quyền lực và chiều sâu văn hóa của đế chế Trung Hoa xưa. Xen giữa các điểm tham quan là những trải nghiệm ẩm thực, mua sắm đặc sản và nhịp sống đô thị hiện đại, giúp hành trình không bị nặng về lịch sử mà vẫn đủ dễ đi với nhiều nhóm khách.',
                'combo_content' => 'Visa đoàn Trung Quốc, khách sạn 4 sao quốc tế, 01 bữa vịt quay Bắc Kinh, xe đưa đón chất lượng cao, hướng dẫn viên, nước suối trên xe và các tiện ích cơ bản cần thiết cho hành trình tham quan Bắc Kinh nhiều điểm di sản.',
                'image_url' => 'https://thaiantravel.com/wp-content/uploads/2024/06/di-hoa-vien-trung-quoc-thaiantravel-4-jpg.webp',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 15,
                'name' => 'Tour Lào: Đất nước Triệu Voi',
                'days' => 3,
                'transport' => 'Xe khách',
                'departure_location' => 'Nghệ An',
                'description' => 'Khám phá vẻ đẹp yên bình của Lào qua những điểm đến giàu màu sắc tâm linh, thiên nhiên và đời sống bản địa, rất phù hợp cho khách thích hành trình nhẹ nhàng, không quá xô bồ.',
                'content' => 'Tour Lào mang đến cảm giác khác biệt rõ rệt so với nhiều hành trình Đông Nam Á khác bởi nhịp sống chậm, hiền hòa và đậm màu sắc Phật giáo. Du khách sẽ được ghé thác Kuang Si xanh ngọc, quan sát nghi thức khất thực buổi sớm, thăm các ngôi chùa cổ, khám phá cố đô Luang Prabang và những biểu tượng nổi bật của Viêng Chăn như Pha That Luang. Chương trình thích hợp cho khách muốn nghỉ ngơi đầu óc, tìm cảm giác bình yên và trải nghiệm một đất nước gần gũi nhưng vẫn đủ mới lạ.',
                'combo_content' => 'Xe giường nằm cao cấp, khách sạn tiêu chuẩn sạch đẹp, các bữa ăn theo thực đơn địa phương, xe đưa đón theo chương trình, hướng dẫn viên hỗ trợ, bảo hiểm du lịch và các dịch vụ cơ bản cho chuyến đi xuyên biên giới thuận tiện.',
                'image_url' => 'https://cdn3.ivivu.com/2024/12/tour-Lao-5N4D-ivivu-9.png',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 18,
                'name' => 'Tour Campuchia: Bí ẩn Angkor',
                'days' => 3,
                'transport' => 'Xe khách',
                'departure_location' => 'TP.HCM',
                'description' => 'Hành trình về miền đất Angkor huyền bí, nơi kiến trúc Khmer cổ đại, không gian đền đài và những câu chuyện lịch sử tạo nên sức hút rất riêng cho Campuchia.',
                'content' => 'Tour Campuchia tập trung vào quần thể Angkor, một trong những kỳ quan gây ấn tượng mạnh nhất khu vực Đông Nam Á. Du khách sẽ ghé Angkor Wat, Angkor Thom, đền Ta Prohm phủ rễ cây cổ thụ và các điểm ngắm hoàng hôn đẹp như đồi Bakheng. Ngoài phần di sản, hành trình còn cho phép du khách cảm nhận rõ văn hóa Khmer qua các buổi buffet có múa Apsara, chợ địa phương và nhịp sống đặc trưng của Siem Reap. Đây là tour ngắn ngày nhưng giàu trải nghiệm, rất phù hợp cho khách thích lịch sử, kiến trúc và chụp ảnh.',
                'combo_content' => 'Xe vận chuyển xuyên biên giới, khách sạn có hồ bơi, buffet tối với múa Apsara truyền thống, lệ phí cửa khẩu, hướng dẫn viên theo chương trình, nước suối trên xe và các dịch vụ cơ bản giúp hành trình Campuchia thuận tiện hơn.',
                'image_url' => 'https://puolotrip.com/images/pro/package-tour-campuchia-4n3d--aCtV_1630.jpg',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 6,
                'name' => 'Tour Vịnh Hạ Long: Du thuyền giữa Kỳ Quan',
                'days' => 2,
                'transport' => 'Xe du lịch',
                'departure_location' => 'Hà Nội',
                'description' => 'Trải nghiệm ngủ đêm trên du thuyền giữa kỳ quan thiên nhiên thế giới, kết hợp tham quan hang động, chèo kayak và tận hưởng không khí nghỉ dưỡng rất riêng của vịnh Hạ Long.',
                'content' => 'Hành trình đưa quý khách len lỏi giữa các hòn đảo đá vôi kỳ ảo trên vịnh Hạ Long, nơi vẻ đẹp thiên nhiên tạo cảm giác vừa hùng vĩ vừa thư giãn. Quý khách sẽ được tham quan Hang Sửng Sốt, chèo thuyền Kayak tại Hang Luồn, ngắm cảnh từ đảo Titop và tận hưởng khoảnh khắc hoàng hôn trên boong tàu. Điểm hấp dẫn nhất của tour là trải nghiệm lưu trú qua đêm trên du thuyền, nơi du khách vừa được nghỉ dưỡng trong không gian sang trọng vừa cảm nhận trọn vẹn vẻ đẹp của di sản giữa mặt nước yên tĩnh về đêm.',
                'combo_content' => 'Xe đưa đón Hà Nội - Hạ Long cao cấp, 01 đêm nghỉ tại cabin du thuyền hạng sang, 03 bữa ăn chính với hải sản tươi sống, vé tham quan các điểm trong chương trình, hướng dẫn viên tiếng Anh hoặc tiếng Việt, nước uống cơ bản và các trải nghiệm đặc trưng trên du thuyền.',
                'image_url' => 'https://halongbay.com.vn/Data/files/B%E1%BB%A9c%20tranh%20thu%E1%BB%B7%20m%E1%BA%B7c%204_Nh%C3%A2n%20d%C3%A2n.png',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 11,
                'name' => 'Tour Phuket 4N3Đ: Biển Andaman Rực Nắng',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Kỳ nghỉ biển trọn gói kết hợp vui chơi, nghỉ dưỡng và khám phá văn hóa đặc trưng của Phuket với nhịp độ vừa phải, phù hợp nhóm bạn, gia đình nhỏ hoặc khách muốn đổi gió bằng một hành trình biển quốc tế ngắn ngày nhưng vẫn đủ trải nghiệm.',
                'content' => 'Hành trình đưa du khách đến với thiên đường biển Phuket, nơi có bãi cát trắng mịn, làn nước xanh trong và không khí nghỉ dưỡng rất rõ nét. Ngay từ ngày đầu, tour đã tạo cảm giác thư giãn với quãng thời gian nhận phòng, làm quen khí hậu biển và khám phá các cung đường ven bờ nổi tiếng. Những ngày tiếp theo tập trung vào các điểm đặc trưng của đảo như phố cổ Phuket với dãy nhà Sino-Portuguese đầy màu sắc, khu Chalong sôi động, các bãi biển nổi tiếng quanh Patong và những góc ngắm hoàng hôn đẹp như Promthep Cape. Ngoài các điểm check-in quen thuộc, chương trình còn để lại khoảng thời gian tự do hợp lý để du khách có thể mua sắm, trải nghiệm massage Thái, thưởng thức hải sản tươi và cảm nhận nhịp sống sôi động về đêm của Phuket. Đây là tour dễ đi, dễ bán và phù hợp cho cả khách lần đầu du lịch Thái Lan lẫn khách cần một kỳ nghỉ biển nhẹ nhàng.',
                'combo_content' => 'Vé máy bay khứ hồi, hành lý tiêu chuẩn, khách sạn 4 sao gần biển, buffet sáng mỗi ngày, 01 bữa tối hải sản kiểu Thái, xe đưa đón sân bay hai chiều, hướng dẫn viên hỗ trợ theo chương trình, vé tham quan các điểm chính và nước suối phục vụ trên xe trong các buổi tham quan.',
                'image_url' => 'https://www.royalcaribbean.com/media-assets/pmc/content/dam/excalibur/digital-stock/royalty-free/shutterstock/2022/2022-08/stock-photo-beautiful-crystal-clear-water-at-pileh-bay-at-phi-phi-island-near-phuket-thailand-735390361.jpg?w=1440',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 26,
                'name' => 'Tour Kyoto 4N3Đ: Nét Đẹp Cố Đô Nhật Bản',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'Hà Nội',
                'description' => 'Hành trình nhẹ nhàng nhưng giàu chiều sâu văn hóa, tập trung vào đền chùa, phố cổ, ẩm thực và không gian truyền thống đặc trưng của Kyoto, rất phù hợp với nhóm khách thích trải nghiệm Nhật Bản theo hướng tinh tế, chậm rãi và có chiều sâu hơn các tour city tour thông thường.',
                'content' => 'Tour đưa du khách chạm vào phần tinh tế nhất của Nhật Bản qua những điểm dừng giàu bản sắc tại Kyoto. Không chỉ đơn thuần ghé thăm các địa danh nổi tiếng, hành trình được sắp theo nhịp vừa phải để du khách có thời gian cảm nhận rõ vẻ đẹp trầm lắng của cố đô. Du khách sẽ dạo bước qua hàng nghìn cổng torii đỏ rực ở Fushimi Inari, ghé chùa Kinkaku-ji soi bóng trên mặt hồ, thong thả trong rừng tre Arashiyama và khám phá khu phố Gion nơi lưu giữ bóng dáng geisha cùng những nếp nhà gỗ truyền thống. Xen giữa các điểm tham quan là khoảng thời gian thưởng thức món địa phương, tìm mua đồ thủ công tinh xảo, ngắm những con hẻm yên bình và cảm nhận nhịp sống rất riêng của Kyoto, nơi hiện đại và cổ kính tồn tại hài hòa trong cùng một không gian. Đây là lịch trình phù hợp cho khách yêu văn hóa, thích chụp ảnh và muốn có cảm giác thực sự đang sống trong một phần Nhật Bản xưa.',
                'combo_content' => 'Vé máy bay khứ hồi, hành lý ký gửi tiêu chuẩn, khách sạn trung tâm Kyoto, buffet sáng kiểu Nhật mỗi ngày, 01 bữa tối Kaiseki cơ bản, vé tàu hoặc xe nội đô theo lịch trình, hướng dẫn viên tiếng Việt hỗ trợ suốt tuyến, bảo hiểm du lịch và hỗ trợ thủ tục nhập cảnh cần thiết.',
                'image_url' => 'https://media.vietravel.com/images/Content/kinh-nghiem-du-lich-kyoto-1.png',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'location_id' => 41,
                'name' => 'Tour Jeju 4N3Đ: Đảo Tình Yêu Gió Biển',
                'days' => 4,
                'transport' => 'Máy bay',
                'departure_location' => 'TP.HCM',
                'description' => 'Tour nghỉ dưỡng và tham quan thiên nhiên Jeju với lịch trình dễ đi, nhấn mạnh cảnh biển, núi lửa, làng địa phương và các điểm check-in nổi tiếng, phù hợp cho khách thích không khí trong lành và muốn trải nghiệm một Hàn Quốc khác hẳn Seoul hay Busan.',
                'content' => 'Jeju mang đến cảm giác thư giãn rất khác so với các đô thị lớn của Hàn Quốc. Trong hành trình này, du khách sẽ ghé Seongsan Ilchulbong để ngắm cảnh biển từ miệng núi lửa cổ, dạo bước trên các cung đường ven biển lộng gió, khám phá làng dân gian và trải nghiệm những góc nhìn rất đặc trưng của đảo như vách đá Jusangjeolli, bãi biển cát đen hay các khu nông trại nổi tiếng với đặc sản địa phương. Không khí tour thiên về thư giãn, ngắm cảnh và cảm nhận thiên nhiên nên phù hợp với nhiều nhóm khách, đặc biệt là khách gia đình hoặc khách trung niên thích lịch trình không quá dồn. Bên cạnh các điểm tham quan nổi bật, chương trình cũng dành thời gian cho mua sắm đặc sản quýt Jeju, thưởng thức hải sản tươi, thịt heo đen nướng và tận hưởng nhịp sống chậm, trong lành của hòn đảo nghỉ dưỡng nổi tiếng nhất Hàn Quốc.',
                'combo_content' => 'Vé máy bay khứ hồi, khách sạn 4 sao trung tâm Jeju, buffet sáng mỗi ngày, 01 bữa BBQ Hàn Quốc, xe đưa đón chất lượng cao, vé tham quan theo chương trình, bảo hiểm du lịch trọn tuyến và hỗ trợ điều phối đoàn trong suốt hành trình.',
                'image_url' => 'https://media-gadventures.global.ssl.fastly.net/media-server/dynamic/blogs/posts/G-Adventures/2025/09/blog-jeju-island-korea-travel-guide-springtime-hiking.webp',
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($tours as &$tour) {
            $legacyLocationId = (int) $tour['location_id'];
            $locationName = $locationNameByLegacyId[$legacyLocationId] ?? null;

            if (!$locationName) {
                throw new \RuntimeException("Không tìm thấy mapping location cho legacy id: {$legacyLocationId}");
            }

            $actualLocationId = DB::table('locations')->where('name', $locationName)->value('id');
            if (!$actualLocationId) {
                throw new \RuntimeException("Không tìm thấy location '{$locationName}' trong bảng locations");
            }

            $tour['location_id'] = (int) $actualLocationId;
        }
        unset($tour);

        DB::table('tours')->insert($tours);
    }
}