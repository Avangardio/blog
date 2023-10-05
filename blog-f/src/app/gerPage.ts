export async function getPage(page1: string | string[] | undefined){
    console.log(page1)
    const page: string = await new Promise(resolve => setTimeout(() => resolve("43"), 1000 ));
    return {
        props: {
            page: page,
            posts: ['nu tipa', 'da', 'zzvzvz']
        }
    }
}