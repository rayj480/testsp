import {ISPList} from './HelloWorldWebPart';

export interface IHelloWorldWebPartProps {
  description: string;
  test: string; 
  test1: boolean;
  test2: string; 
  test3: boolean;
  siteUrl: string; 
  data: ISPList[];
}
