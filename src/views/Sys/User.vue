<template>
    <div class="page-container">
        <!-- 工具栏 -->
        <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px">
            <el-form :inline="true" :model="filters" :size="size">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:user:view" type="primary" @click="findPage(null)" />
                </el-form-item>
                <el-form-item>
                    <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:user:ad" type="primary" @click="handleAdd" />
                </el-form-item>
            </el-form>
        </div>

        <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px">
            <el-form :inline="true" :size="size">
                <el-form-item>
                    <el-button-group>
                        <el-tooltip content="刷新" placement="top">
                            <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
                        </el-tooltip>
                        <!-- <el-tooltip content="列显示" placement="top">
                            <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
                        </el-tooltip> -->
                        <el-tooltip content="导出" placement="top">
                            <el-button icon="fa fa-file-excel-o" @click="exportUserExcelFile"></el-button>
                        </el-tooltip>
                    </el-button-group>
                </el-form-item>
            </el-form>
            <!-- <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
                @handleFilterColumns="handleFilterColumns">
            </table-column-filter-dialog> -->
        </div>

        <!-- 表格内容 -->
        <kt-table permsEidt="sys:user:edit" permsDelete="sys:user:delete"
            :data="pageResult" :columns="filterColumns"
            @findPage="findPage" @handleEit="handleEdit" @handleDelete="handleDelete">
        </kt-table>
    </div>
</template>

<script>
import KtTable from '@/views/core/KtTable'
import KtButton from '@/views/core/KtButton'
export default {
    name: 'User',
    components: {
        KtTable,
        KtButton
    },
    data() {
        return {
            size: 'small',
            filters: {
                name: ''
            },
            columns: [],
            filterColumns: [],
            pageRequest: {
                pageNum: 1,
                pageSize: 8
            },
            pageResult: {},

            operation: false,
            dialogVisible: false,
            editLoading: false,
            dataFormRules: {
                name: [{required: true, messages: '请输入用户名', trigger: 'blur'}]
            },


        }
    },
    methods: {
        findPage: function(data) {

        },
        exportUserExcelFile: function() {

        },
        handleDelete: function(data) {

        },
        handleAdd: function() {

        },
        handleEdit: function(params) {

        }
    }
}
</script>