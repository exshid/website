const LatestPostsContainer = ({ children }) => {
    return (
<>
<span className="py-3 md:px-6 lg:p-6 xl:px-20 text-black font-italic text-3xl font-semibold uppercase">Latest</span>
<div className="py-3 md:px-6 lg:p-6 flex xl:px-20 flex-col lg:flex-row">

{children}
</div>
</>
        );
  };
  

  export default LatestPostsContainer;