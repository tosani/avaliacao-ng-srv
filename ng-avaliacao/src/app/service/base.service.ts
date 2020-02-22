import { environment } from 'src/environments/environment';

export class BaseService {

    getBaseServiceUrl(): string {
        return environment.BASE_SERVICE_URL + "/" + environment.CONTEXT_NAME;
    }
}