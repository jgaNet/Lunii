import { Repository } from "./Repository";
export interface Query<I, O> {
	execute(input: I): Promise<O>;
}
