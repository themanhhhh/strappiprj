import {ButtonLink} from '@/components/button-link';

type PackagedProductsProps = {
  locale: string;
};

export function PackagedProducts({locale}: PackagedProductsProps) {
  return (
    <section className="aladdin-section bg-gray">
      <div className="shell">
        <div className="packaged-banner">
          <div className="packaged-content">
            <h2 className="packaged-title">
              {locale === 'vi' ? 'Sản Phẩm Đóng Gói' : 'Packaged Products'}
            </h2>
            <p className="packaged-desc">
              {locale === 'vi' 
                ? 'Đem hương vị nhà hàng chuyên nghiệp đến tận gian bếp của bạn với các dòng sản phẩm đóng gói chất lượng cao.' 
                : 'Bring professional restaurant flavors to your kitchen with our high-quality packaged product lines.'}
            </p>
            <ButtonLink href={`/${locale}/services`} variant="primary" className="packaged-btn">
              {locale === 'vi' ? 'Tìm hiểu thêm' : 'Learn more'}
            </ButtonLink>
          </div>
          <div className="packaged-image">
             <div className="image-placeholder-red"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
