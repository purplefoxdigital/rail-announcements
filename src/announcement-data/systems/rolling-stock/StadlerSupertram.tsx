import CustomAnnouncementPane, { ICustomAnnouncementPreset } from '@components/PanelPanes/CustomAnnouncementPane'
import CustomButtonPane from '@components/PanelPanes/CustomButtonPane'
import AnnouncementSystem, { AudioItem, CustomAnnouncementTab } from '../../AnnouncementSystem'
import { AllStationsTitleValueMap } from '@data/StationManipulators'

interface IDepartingStopAnnouncementOptions {
  routeName: string
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
    )

    switch (options.routeName) {
      case 'Blue':
        files.push('this is the blue route service to')
        break
      case 'Purple':
        files.push('this is the purple route service to')
        break
      case 'Yellow':
        files.push('this is the yellow route service to')
        break
      case 'Tram Train':
        files.push('this is the tram train service to')
        break
    }

    files.push(
      `stations.${options.terminatesAtCode}`,
      'the next stop by request will be',
      `stations.${options.nextStationCode}`,
    )

    if (options.terminatesAtCode == options.nextStationCode) {
      files.push('where this service terminates')
    }


    await this.playAudioFiles(files, download)
  }

  private Routes = [
    'Blue',
    'Purple',
    'Yellow',
    'Tram Train',
  ]

  private AllStations = [
    { code: 'ARR', name: 'Arborthorne Road' },
    { code: 'ARS', name: 'Arena / Olympic Legacy Park' },
    { code: 'ATT', name: 'Attercliffe' },
    { code: 'BAS', name: 'Bamforth Street' },
    { code: 'BDH', name: 'Beighton / Drake House Lane' },
    { code: 'BIL', name: 'Birley Lane' },
    { code: 'BMR', name: 'Birley Moor Road' },
    { code: 'CAR', name: 'Carbrook (IKEA)' },
    { code: 'CAS', name: 'Castle Square' },
    { code: 'CAT', name: 'Cathedral' },
    { code: 'CIH', name: 'City Hall' },
    { code: 'CIR', name: 'Cricket Inn Road' },
    { code: 'CRP', name: 'Crystal Peaks' },
    { code: 'DOW', name: 'Donetsk Way' },
    { code: 'FIS', name: 'Fitzalan Square' },
    { code: 'GLT', name: 'Gleadless Townend' },
    { code: 'GRR', name: 'Granville Road / The Sheffield College' },
    { code: 'HAC', name: 'Hackenthorpe' },
    { code: 'HAL', name: 'Halfway' },
    { code: 'HEP', name: 'Herdings Park' },
    { code: 'HIL', name: 'Hillsborough' },
    { code: 'HIP', name: 'Hillsborough Park' },
    { code: 'HLR', name: 'Herdings / Leighton Road' },
    { code: 'HOL', name: 'Hollinsend' },
    { code: 'HYP', name: 'Hyde Park' },
    { code: 'INR', name: 'Infirmary Road' },
    { code: 'LEL', name: 'Leppings Lane' },
    { code: 'LPV', name: 'Langsett / Primrose View' },
    { code: 'MAB', name: 'Malin Bridge' },
    { code: 'MEI', name: 'Meadowhall Interchange' },
    { code: 'MID', name: 'Middlewood' },
    { code: 'MOW', name: 'Moss Way' },
    { code: 'MTE', name: 'Manor Top' },
    { code: 'NER', name: 'Netherthorpe Road' },
    { code: 'NUS', name: 'Nunnery Square' },
    { code: 'PAG', name: 'Park Grange' },
    { code: 'PGC', name: 'Park Grange Croft' },
    { code: 'PGR', name: 'Rotherham Parkgate' },
    { code: 'ROT', name: 'Rotherham Central' },
    { code: 'SHA', name: 'Shalesmoor' },
    { code: 'SHS', name: 'Sheffield Station / Sheffield Hallam University' },
    { code: 'SPL', name: 'Spring Lane' },
    { code: 'TIN', name: 'Tinsley / Meadowhall South' },
    { code: 'UOS', name: 'University of Sheffield' },
    { code: 'VAC', name: 'Valley Centertainment' },
    { code: 'WAT', name: 'Waterthorpe' },
    { code: 'WED', name: 'Westfield' },
    { code: 'WES', name: 'West Street' },
    { code: 'WHL', name: 'White Lane' },
    { code: 'WOR', name: 'Woodbourne Road' },
  ]

  readonly customAnnouncementTabs: Record<string, CustomAnnouncementTab<string>> = {
    departingStation: {
      name: 'Departing station',
      component: CustomAnnouncementPane,
      defaultState: {
        routeName: this.Routes[0],
        terminatesAtCode: this.AllStations[0].code,
        nextStationCode: this.AllStations[0].code,
      },
      props: {
        playHandler: this.playDepartingStopAnnouncement.bind(this),
        options: {
          routeName: {
            name: 'Route name',
            default: this.Routes[0],
            options: this.Routes.map(route => ({ title: route, value: route })),
            type: 'select',
          },
          terminatesAtCode: {
            name: 'Terminates at',
            default: this.AllStations[0].code,
            options: this.AllStations.map(s => ({ title: s.name, value: s.code })),
            type: 'select',
          },
          nextStationCode: {
            name: 'Next station',
            default: this.AllStations[0].code,
            options: this.AllStations.map(s => ({ title: s.name, value: s.code })),
            type: 'select',
          },
        },
      },
    } as CustomAnnouncementTab<keyof IDepartingStopAnnouncementOptions>,
  }
}

