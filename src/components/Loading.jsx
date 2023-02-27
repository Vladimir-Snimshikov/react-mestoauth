import { elemClasses } from '../utils/constans';

const { preloader, preloaderItem } = elemClasses;

function Loading() {
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
