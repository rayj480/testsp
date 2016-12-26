import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../HelloWorld.module.scss';
import { IHelloWorldWebPartProps } from '../IHelloWorldWebPartProps';
import {ISPList} from '../HelloWorldWebPart';

export interface IHelloWorldProps extends IHelloWorldWebPartProps {
}

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
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
              <p className='ms-font-l ms-fontColor-white'>Loading from {this.props.siteUrl}</p>
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
            {this.props.data.map((item) => {
              <li className={styles.listItem}>
                  <span className="ms-font-l">{item.Title}</span>
              </li>
            })}
            
          </ul>
        </div>
      </div>
    );
  }
}
