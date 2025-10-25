import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Chi phí học phí là bao nhiêu?",
    a: `Chi phí phụ thuộc vào nhiều yếu tố: trình độ gia sư (giáo viên/ sinh viên/ chuyên gia),
    môn học, tần suất và hình thức dạy (online / offline). Bạn có thể xem mức giá tham khảo trên hồ sơ
    gia sư hoặc yêu cầu báo giá cụ thể khi gửi thông tin.`,
  },
  {
    q: "Nếu không hài lòng với gia sư thì sao?",
    a: `VietTutor có chính sách đổi gia sư và hoàn tiền trong những trường hợp đạt điều kiện. Nếu buổi học thử
    không phù hợp, báo với chúng tôi - đội ngũ chăm sóc sẽ hỗ trợ đổi gia sư hoặc xử lý hoàn tiền theo chính sách.`,
  },
  {
    q: "VietTutor kiểm soát chất lượng như thế nào?",
    a: `Mỗi gia sư đều trải qua quy trình sàng lọc: kiểm tra hồ sơ, phỏng vấn chuyên môn và thử giảng. Sau khi nhận
    lớp, phụ huynh có thể đánh giá và phản hồi - giúp chúng tôi duy trì chất lượng. Chỉ ~10% ứng viên được tuyển.`,
  },
  {
    q: "Làm thế nào để thanh toán?",
    a: `Chúng tôi hỗ trợ nhiều phương thức thanh toán: chuyển khoản ngân hàng, ví điện tử hoặc thẻ. Thanh toán có thể
    thực hiện trước buổi học hoặc theo thỏa thuận với gia sư; hóa đơn và biên lai sẽ được cung cấp khi cần.`,
  },
];

export default function QnA() {
  return (
    <section className="py-12 container mx-auto">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Giải đáp mọi thắc mắc của Phụ huynh.
        </h2>
        <p className="text-center text-slate-600 mt-2">
          Những câu hỏi phổ biến - nhấp để mở câu trả lời.
        </p>

        <div className="mt-6 space-y-3">
          <Accordion type="single" defaultValue="item-0" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-lg overflow-hidden"
              >
                <AccordionTrigger>
                  <span className="font-medium text-base">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base leading-relaxed pt-2">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
