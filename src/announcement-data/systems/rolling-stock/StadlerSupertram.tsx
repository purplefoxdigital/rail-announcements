import CustomAnnouncementPane, { ICustomAnnouncementPreset } from '@components/PanelPanes/CustomAnnouncementPane'
import CustomButtonPane from '@components/PanelPanes/CustomButtonPane'
import AnnouncementSystem, { AudioItem, CustomAnnouncementTab } from '../../AnnouncementSystem'
import { AllStationsTitleValueMap } from '@data/StationManipulators'

interface IDepartingStopAnnouncementOptions {
  terminatesAtCode: string
  nextStationCode: string
}

export default class StadlerSupertram extends AnnouncementSystem {
  readonly NAME = 'Stadler Class 399 - Sheffield Supertram'
  readonly ID = 'STADLER_SUPERTRAM_V1'
  readonly FILE_PREFIX = 'Supertram/Stadler'
  readonly SYSTEM_TYPE = 'train'

  private async playDepartingStopAnnouncement(options: IDepartingStopAnnouncementOptions, download: boolean = false): Promise<void> {
    const files: AudioItem[] = []

    files.push(
      'hold tight please',
      'bingbong',
      'this is the tram train service to',
      `stations.${options.terminatesAtCode}`,
      'the next stop by request will be',
      `stations.${options.nextStationCode}`,
    )

    if (options.terminatesAtCode == options.nextStationCode) {
      files.push('where this service terminates')
    }


    await this.playAudioFiles(files, download)
  }
  private AllStationFiles = [
    'ATE',
    'CAE',
    'CAX',
    'CIN',
    'FIZ',
    'HYP',
    'SAI',
    'SHQ',
    'VAE'
  ]

  readonly customAnnouncementTabs: Record<string, CustomAnnouncementTab<string>> = {
    departingStation: {
      name: 'Departing station',
      component: CustomAnnouncementPane,
      defaultState: {
        terminatesAtCode: this.AllStationFiles[0],
        nextStationCode: this.AllStationFiles[0],
      },
      props: {
        playHandler: this.playDepartingStopAnnouncement.bind(this),
        options: {
          terminatesAtCode: {
            name: 'Terminates at',
            default: this.AllStationFiles[0],
            options: AllStationsTitleValueMap.filter(s => this.AllStationFiles.includes(s.value)),
            type: 'select',
          },
          nextStationCode: {
            name: 'Next station',
            default: this.AllStationFiles[0],
            options: AllStationsTitleValueMap.filter(s => this.AllStationFiles.includes(s.value)),
            type: 'select',
          },
        },
      },
    } as CustomAnnouncementTab<keyof IDepartingStopAnnouncementOptions>,
  }
}

