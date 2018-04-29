import {Component, OnInit, OnDestroy} from '@angular/core';
import {Viewer} from '../../../services/viewer';
import {PointCloudOctree} from '@pix4d/three-potree-loader';
import {ViewerSettingManager} from '../../../services/ViewerSettingManager';

@Component({
  selector: 'app-potree-viewer',
  templateUrl: './potree-viewer.component.html',
  styleUrls: ['./potree-viewer.component.css']
})
export class PotreeViewerComponent implements OnInit, OnDestroy {
  viewer: Viewer;
  pointCloudOctree: PointCloudOctree;
  idChange: number;

  constructor() {
  }

  /**
   * Function to update point cloud rendering options.
   */
  updatePointCloud() {
    this.pointCloudOctree.material.shape = ViewerSettingManager.Instance.shapeType;
    this.pointCloudOctree.material.size = ViewerSettingManager.Instance.size;
    this.pointCloudOctree.material.opacity = ViewerSettingManager.Instance.opacity;
    this.pointCloudOctree.material.pointColorType = ViewerSettingManager.Instance.pointColorType;
  }

  ngOnInit() {
    this.idChange = ViewerSettingManager.Instance.onChange(() => {
      this.updatePointCloud();
    });
    this.viewer = new Viewer();
    this.viewer.initialize(document.getElementById('target'));

    this.viewer
      .load(
        'cloud.js',
        'https://cdn.rawgit.com/potree/potree/develop/pointclouds/lion_takanawa/'
      )
      .then(pco => {
        // Make the lion shows up at the center of the screen.
        pco.translateX(-1);
        pco.rotateX(-Math.PI / 2);

        // The point cloud octree already comes with a material which
        // can be customized directly. Here we just set the size of the
        // points.
        this.pointCloudOctree = pco;
        this.updatePointCloud();
      })
      .catch(err => console.error(err));
  }

  /**
   * Clear memory
   */
  ngOnDestroy() {
    ViewerSettingManager.Instance.offChange(this.idChange);
    this.viewer.destroy();
  }
}
