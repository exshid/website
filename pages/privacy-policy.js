import InnerPage from "@layouts/components/InnerPage";


function Privacy ({content, pageTitle, description}) {
  return <InnerPage content={content} pageTitle={pageTitle} description={description} />

}
export default Privacy;


export async function getStaticProps() {
    const content = `<p>Nullam augue arcu, viverra non urna at, ornare malesuada leo. Suspendisse fermentum eros vitae eleifend dignissim. Nam at blandit risus. Nunc at placerat quam, eget porta libero. Nullam dui est, euismod sit amet justo pellentesque, tincidunt dictum tellus. Quisque scelerisque sodales velit, id lobortis sem malesuada a. Vivamus eleifend maximus libero, at lobortis ante mattis ac. In ac augue eros. Pellentesque sagittis, ligula feugiat pellentesque tristique, massa nisl commodo lacus, non sodales est odio eget odio. Cras a nibh mi.</p>
  
  <p>Aliquam in dapibus felis. Quisque a mi nunc. Cras blandit mauris erat, et imperdiet nibh aliquet nec. Phasellus eu nisi a massa porta iaculis in vel odio. In eu diam a urna euismod maximus. Quisque sit amet lacus quis mi tristique aliquam ut eget libero. Aliquam id sodales turpis, sit amet semper nibh. Morbi consequat ante erat, ut lacinia nunc vehicula nec. Maecenas vestibulum enim id turpis mollis scelerisque ac sed nisi. Proin at sapien a ipsum tempus consectetur quis in mauris. In vel aliquet nisi. Fusce lobortis ante eget lectus accumsan, quis maximus neque condimentum.</p>
  
  <p>Phasellus lorem sapien, congue ac tellus nec, aliquam dictum leo. In convallis lacinia sapien ut rhoncus. Pellentesque accumsan tortor quis tincidunt viverra. Integer a ex ac dolor tincidunt varius sed eu lorem. Cras vel diam lorem. Ut at pharetra lectus, ac sagittis odio. Proin condimentum est non aliquam mattis. Aenean venenatis felis id dictum interdum. Vivamus eget ornare nisl. Morbi hendrerit quam mollis nisi faucibus lacinia. Duis malesuada ex sed sapien aliquam, posuere lobortis nulla viverra. Sed orci enim, lobortis eu elit iaculis, venenatis tristique orci. Proin luctus ut urna eu lacinia. Sed eu volutpat ex.</p>
  
  <p>Sed placerat nunc id sollicitudin tempor. Praesent rhoncus consequat metus, in aliquet tellus iaculis a. Ut ornare purus convallis pulvinar blandit. Sed gravida volutpat consequat. Phasellus erat sapien, venenatis eu congue non, suscipit convallis mauris. Aenean tincidunt sem aliquam dapibus dignissim. Morbi mollis dolor sed accumsan aliquam. Integer sit amet cursus risus. Duis pulvinar facilisis ipsum in porta. Morbi non laoreet nisl, vel convallis massa. Cras non sollicitudin orci. Sed tristique eleifend nibh, eget ultrices est.</p>
  
  <p>Pellentesque volutpat eget odio eu luctus. Aliquam tincidunt condimentum turpis convallis interdum. Nunc vulputate placerat erat, ut malesuada quam sodales non. Donec id ipsum ac orci placerat sagittis. Duis eros ligula, aliquet eget commodo nec, congue id erat. Nulla elementum faucibus tellus, vel tristique mauris lacinia pharetra. Phasellus at pellentesque nunc. Duis a eros vehicula, placerat nibh ac, ornare velit. Mauris eu molestie orci, et varius dui. Nullam tincidunt auctor lacus, ac varius purus efficitur et. Curabitur convallis massa vel nisi accumsan rhoncus. Vestibulum interdum ac urna sit amet tempus. Ut vitae urna dapibus, iaculis leo id, rutrum erat.</p>
  
  <p>Donec est neque, sollicitudin nec erat et, lacinia viverra est. Sed sapien neque, hendrerit sed ligula sollicitudin, tincidunt semper est. Nullam faucibus dui tempus fringilla posuere. Nam fermentum rutrum fermentum. Quisque finibus suscipit efficitur. Ut vitae nisl a libero porta pharetra. Integer lobortis gravida porttitor. Pellentesque ac velit volutpat, dapibus diam vel, pharetra nibh. Quisque pulvinar neque diam, ut accumsan turpis accumsan at. Phasellus quis metus et tellus aliquam sagittis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex dolor, porttitor sit amet magna et, porttitor consectetur quam. Nunc quis enim ut ligula sagittis faucibus id quis nisi.</p>
  
  <p>Quisque est eros, faucibus non urna eu, ornare sodales neque. Cras dapibus augue sem, quis consequat ante rhoncus vitae. Nunc ultrices sapien augue, vitae tristique metus tincidunt sit amet. Nullam tortor tortor, volutpat et volutpat vel, euismod nec eros. Fusce sollicitudin vulputate rutrum. Nulla eget aliquet ex. Praesent dignissim enim in dapibus egestas. Praesent quis nisi magna. Proin faucibus, nibh ut efficitur pretium, leo magna pretium eros, et faucibus leo erat et leo. Etiam aliquet elit magna, nec congue tellus porttitor in. Sed in commodo lectus. Vivamus in ligula ac arcu vehicula vehicula a at mauris. Quisque hendrerit fermentum sollicitudin. Quisque rutrum sem quis sapien suscipit semper. Nam sodales ante sed interdum pellentesque.</p>
  
  <p>Morbi varius facilisis cursus. Duis non volutpat lectus. Nullam lobortis consectetur neque, nec convallis enim accumsan non. Nulla quis interdum magna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tincidunt, erat eu pretium convallis, nisi mi dapibus ligula, id congue erat libero non augue. Aenean quis nisi felis. Integer egestas ex sed ultricies cursus. Aliquam faucibus nisl sit amet sapien hendrerit iaculis. Phasellus libero nibh, facilisis et lectus nec, pulvinar finibus dolor. Cras quis lectus rhoncus, porttitor tellus vel, ullamcorper augue. Cras tristique purus nisl, nec aliquet orci sodales et. Praesent in nisl commodo, viverra velit at, commodo quam. Duis efficitur porttitor justo sit amet pulvinar.</p>
  
  <p>Mauris ultricies volutpat fermentum. Morbi a ex quis quam aliquam pharetra vel nec felis. Sed et ex sodales sem eleifend suscipit. Sed accumsan sem vitae purus bibendum placerat. Sed id erat pulvinar, hendrerit nunc at, mattis turpis. Suspendisse potenti. Nunc blandit volutpat dignissim. Sed tempor eget neque non rutrum.</p>
  
  <p>Donec et dapibus sapien, vel mattis velit. Duis aliquet vulputate mattis. Sed imperdiet posuere massa at tincidunt. Vivamus laoreet, arcu nec aliquam consectetur, velit diam suscipit nisl, sed laoreet turpis libero id nunc. Suspendisse aliquam dapibus egestas. In venenatis est ut sapien convallis tempor. Quisque pretium sodales volutpat. In consequat pulvinar iaculis. Cras in sem mi. Vestibulum et porttitor est, finibus placerat mauris. Nunc at viverra metus, at gravida est.</p>
  
  <p>Phasellus id dui ut nisi blandit egestas vel id enim. Vivamus ut iaculis odio, vitae vulputate ipsum. Ut purus metus, laoreet ut porttitor fermentum, ultrices et enim. Nulla feugiat diam nisl, non fringilla dui pretium non. Curabitur viverra enim non nisi pulvinar elementum. Aenean sit amet pulvinar orci. Vivamus convallis odio eget tristique suscipit. Nulla felis velit, scelerisque a ultricies non, hendrerit id magna. Maecenas a lectus mauris. Cras dignissim erat nec diam accumsan, nec ullamcorper mi dignissim.</p>`;
  const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quam purus, congue ut risus at, semper fringilla dui. Curabitur rutrum lacus sed imperdiet sodales. Sed egestas nulla justo, sed pharetra metus rhoncus ac. Aliquam lacus ex, hendrerit vitae posuere ac, pulvinar fringilla eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non molestie ante. Nunc quis diam eu arcu semper imperdiet id in ligula. Donec id ultricies nisl.`

  return {
    props: {
      content: content,
      pageTitle: 'Privacy Policy',
      description: description,
    },
  };
}
