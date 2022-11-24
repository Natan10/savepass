import { SavePassRoutesList } from '../../routes/routes'

declare global {
  namespace ReactNavigation{
    interface RootParamList extends SavePassRoutesList {}
  }
}