// store/page.js
export const useTitlePagesStore = defineStore('TitlePages', {
  state: () => ({
    pageTitle: ''
  }),
  actions: {
    setPageTitle(title:string) {
      this.pageTitle = title;
    }
  }
});