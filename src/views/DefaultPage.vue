<template>
    <div class="row">
        <div
            class="navbar navbar-default navbar-fixed-top navbar-transparent-black mm-fixed-top"
            role="navigation"
            id="navbar"
        >
            <div class="navbar-header col-md-2">
                <a class="navbar-brand" href="">
                    R2 - The Max Planck Nu Generation Repository
                </a>
            </div>
            <ul class="nav navbar-nav quick-actions hidden">
                <li class="dropdown divided">
                    <a class="dropdown-toggle button" data-toggle="dropdown" href="">
                        <i class="fa fa-tasks"></i>
                        <span class="label label-transparent-black">2</span>
                    </a>

                    <ul class="uploads dropdown-menu wide arrow nopadding bordered animated fadeInDown">
                        <li>
                            <h1>
                                You have
                                <strong>3</strong>
                                pending uploads
                            </h1>
                        </li>
                        <li>
                            <a href="">
                                <div class="task-info">
                                    <div class="desc">fbaA_i_Aquity001P5D11.txt</div>
                                    <div class="percent">80%</div>
                                </div>
                                <div class="progress progress-striped progress-thin">
                                    <div
                                        class="progress-bar progress-bar-green"
                                        role="progressbar"
                                        aria-valuenow="40"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style="width: 80%"
                                    >
                                        <span class="sr-only">40% Complete (success)</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <div class="task-info">
                                    <div class="desc">AQABA_VOC_Data.xlsx</div>
                                    <div class="percent">50%</div>
                                </div>
                                <div class="progress progress-striped progress-thin">
                                    <div
                                        class="progress-bar progress-bar-green"
                                        role="progressbar"
                                        aria-valuenow="40"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style="width: 80%"
                                    >
                                        <span class="sr-only">50% Complete (success)</span>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <div class="task-info">
                                    <div class="desc">H1000_Cer_Rain.dat</div>
                                    <div class="percent">30%</div>
                                </div>
                                <div class="progress progress-striped progress-thin">
                                    <div
                                        class="progress-bar progress-bar-red"
                                        role="progressbar"
                                        aria-valuenow="45"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style="width: 30%"
                                    >
                                        <span class="sr-only">30% Complete (danger)</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Check all upload details
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="dropdown divided">
                    <a class="dropdown-toggle button" data-toggle="dropdown" href="">
                        <i class="fa fa-bell"></i>
                        <span class="label label-transparent-black">3</span>
                    </a>

                    <ul class="notifications dropdown-menu wide arrow nopadding bordered animated fadeInDown">
                        <li>
                            <h1>
                                You have
                                <strong>3</strong>
                                new notifications
                            </h1>
                        </li>

                        <li>
                            <a href="">
                                <span class="label label-green"><i class="fa fa-user"></i></span>
                                New version successful published.
                                <span class="small">18 mins</span>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <span class="label label-red"><i class="fa fa-power-off"></i></span>
                                Upload failed with data error
                                <span class="small">27 mins</span>
                            </a>
                        </li>

                        <li>
                            <a href="">
                                Check all notifications
                                <i class="fa fa-angle-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="dropdown divided user" id="current-user">
                    <div class="profile-photo">
                        <img src="assets-pub/images/profile-photo.png" width="20px" alt />
                    </div>
                    <a class="dropdown-toggle options" data-toggle="dropdown" href="">
                        Milla Jo
                        <i class="fa fa-caret-down"></i>
                    </a>

                    <ul class="settings dropdown-menu arrow settings animated fadeInDown">
                        <li>
                            <a href="">
                                <i class="fa fa-user"></i>
                                Profile
                            </a>
                        </li>

                        <li>
                            <a href="">
                                <i class="fa fa-calendar"></i>
                                Calendar
                            </a>
                        </li>

                        <li class="divider"></li>

                        <li>
                            <a href="">
                                <i class="fa fa-power-off"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <cage></cage>
    <sub-bar></sub-bar>
</template>

<script>
import Cage from '@/components/Cage.vue'
import SubBar from '@/components/SubBar.vue'


export default {
    components: {
        Cage, SubBar
    },
    props: {
        user: { type: String },
        config: {
            id: { type: String }
        }
    },
    setup(props) {
        // console.log('SETUP: props = ', props)
        // console.log('SETUP: props.user = ', props.user)
        // console.log('SETUP: props.config = ', props.config)
        return {} // anything returned here will be available for the rest of the component
    },
    mounted() {
        // TODO move this into the device control class
        // globals.eventBus.$emit("testEvent");
        window.globals.eventBus.$on('test-event', this.onTestEvent)
    },
    methods: {
        onTestEvent(evt) {
            console.log('onTestEvent: evt = ', evt)
        }
    }
}
</script>
