import { elemClasses } from '../utils/constans';
function Loading() {
  const { preloader, preloaderItem } = elemClasses;
  const item = <span className={preloaderItem}></span>;
  return (
    <div className={preloader}>
      {item}
      {item}
      {item}
      {item}
      {item}
    </div>
  );
}

export default Loading;
