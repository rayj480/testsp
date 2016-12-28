import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../HelloWorld.module.scss';
import { IHelloWorldWebPartProps } from '../IHelloWorldWebPartProps';
import {ISPList, ISPLists} from '../HelloWorldWebPart';
import {Environment, EnvironmentType} from '@microsoft/sp-client-base';

import MockHttpCLient from '../MockHttpClient';

export interface IHelloWorldProps extends IHelloWorldWebPartProps {
}

export interface IProps{
  data: ISPList[];
}

export default class HelloWorld extends React.Component<IHelloWorldProps, IProps> {

  public constructor(props: IHelloWorldProps, state: IProps){
    super(props);
    this.state = {
      data : []
    };

    console.log(this.state);
  }

  public componentDidMount(){
    
    this._renderListAsync((d) => {
      this.setState({
        data: d
      });
    });
  }
  
  private _renderListAsync(cb):void{

    //var d: ISPList[];
    // local Environment
    if(Environment.type === EnvironmentType.Local){
      this._getMockListData().then((response) => {
        cb(response.value);
      });
    }
    else if(Environment.type === EnvironmentType.SharePoint ||
            Environment.type === EnvironmentType.ClassicSharePoint){

      this._getListData().then((response) => {
        cb(response.value);
      });
   }
  }

  private _getMockListData(): Promise<ISPLists>{
    return MockHttpCLient.get(this.props.context.pageContext.web.absoluteUrl)
      .then((data: ISPList[]) => {
        var listData: ISPLists = {value: data};
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(): Promise<ISPLists>{
    return this.props.context.httpClient.get(this.props.context.pageContext.web.absoluteUrl + '/_api/web/lists?$filter=Hidden eq false')
      .then((response: Response) => {
        return response.json();
      });
  }


  public render(): JSX.Element {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint FrameWork ! 
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.test}, {this.props.test1}, {this.props.test2}, {this.props.test3}
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
              <p className='ms-font-l ms-fontColor-white'>Loading from {this.props.context.pageContext.web.title}</p>
              <a
                className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'
              >
                <span className='ms-Button-label'>Learn more</span>
              </a>
            </div>
          </div>
        </div>
        <div id="spListContainer">
        
          <ul className={styles.list}>

            {this.state.data.map((item:ISPList) => {
              return (<li className={styles.listItem}>
                  <span className="ms-font-l">{item.Title}</span>
              </li>);
            })}
            
          </ul>

        </div>
      </div>
    );
  }
}

