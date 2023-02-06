import { elemClasses } from '../utils/constans';
export default function Footer() {
  const { footer, footerCopyright } = elemClasses;
  let currentYear = new Date().getFullYear();
  return (
    <footer className={footer}>
      <p className={footerCopyright}>© {currentYear} Mesto Russia</p>
    </footer>
  );
}
