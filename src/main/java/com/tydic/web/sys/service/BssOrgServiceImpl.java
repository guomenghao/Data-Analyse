package com.tydic.web.sys.service;

import org.springframework.stereotype.Service;

import com.tydic.base.exception.BusinessException;
import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.Maps;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResultUtil;

@Service("bssOrgService")
public class BssOrgServiceImpl extends ServiceBase implements BssOrgService {

	public IMapEntry<String, Object> selectBssOrgList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.bssorg.selectBssOrgList", paramMap));
	}

	public IMapEntry<String, Object> insertBssOrg(IMapEntry<String, Object> paramMap) {

		String up_bss_org_path = "";
		if (ObjectUtil.isNotEmpty(paramMap.getString("up_bss_org_id"))) {
			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> param = Maps.newMapEntry();
			param.put("bss_org_id", paramMap.getString("up_bss_org_id"));
			IMapEntry<String, Object> data = this.selectOne("sys.bssorg.selectBssOrgList", param);
			if (ObjectUtil.isEmpty(data)) {
				throw new BusinessException("指定的上级机构标识不存在，请核实!");
			}
			up_bss_org_path = data.getString("bss_org_path");
		}

		paramMap.put("bss_org_id_auto_id", null);
		this.insert("sys.bssorg.insertBssOrg", paramMap);

		String bss_org_id_auto_id = paramMap.getString("bss_org_id_auto_id");
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("bss_org_id", bss_org_id_auto_id);
		if (ObjectUtil.isNotEmpty(paramMap.getString("up_bss_org_id"))) {
			param.put("bss_org_path", up_bss_org_path + bss_org_id_auto_id + "-");
		} else {
			param.put("bss_org_path", "-" + bss_org_id_auto_id + "-");
		}
		this.update("sys.bssorg.updateBssOrgPathByBssOrgId", param);

		return ResultUtil.resultSuccess("新增机构信息成功!");
	}

	public IMapEntry<String, Object> updateBssOrg(IMapEntry<String, Object> paramMap) {
		IMapEntry<String, Object> data = this.selectOne("sys.bssorg.selectBssOrgList", paramMap);
		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("指定的机构标识不存在，请核实!");
		}

		this.update("sys.bssorg.updateBssOrg", paramMap);

		// 如果上级机构发生了变化，则还需要变更机构path
		String req_up_bss_org_id = paramMap.getString("up_bss_org_id");
		String cur_up_bss_org_id = data.getString("up_bss_org_id");

		if ((ObjectUtil.isEmpty(req_up_bss_org_id) && ObjectUtil.isEmpty(cur_up_bss_org_id))
				|| (req_up_bss_org_id.equalsIgnoreCase(cur_up_bss_org_id))) {
			// 相同，无变化，不需要更新
		} else {
			// 不相同有变化，需要更新path
			String v_bss_org_path_current = data.getString("bss_org_path");
			String v_bss_org_path_new = "-" + data.getString("bss_org_id") + "-";
			if (ObjectUtil.isNotEmpty(req_up_bss_org_id)) {
				@SuppressWarnings("unchecked")
				IMapEntry<String, Object> param = Maps.newMapEntry();
				param.put("bss_org_id", req_up_bss_org_id);
				IMapEntry<String, Object> up_bss_org_data = this.selectOne("sys.bssorg.selectBssOrgList", param);
				v_bss_org_path_new = up_bss_org_data.getString("bss_org_path") + data.getString("bss_org_id") + "-";
			}
			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> param = Maps.newMapEntry();
			param.put("v_bss_org_path_current", v_bss_org_path_current);
			param.put("v_bss_org_path_new", v_bss_org_path_new);
			this.update("sys.bssorg.updateBssOrgPath", param);
		}

		return ResultUtil.resultSuccess("更新机构信息成功!");
	}

	public IMapEntry<String, Object> delBssOrg(IMapEntry<String, Object> paramMap) {
		// 业务逻辑：暂时只验证如下一种业务
		// 区域下存在员工的，不能删除
		// ......
		IMapEntry<String, Object> data = this.selectOne("sys.bssorg.selectBssOrgList", paramMap);
		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("指定的机构标识不存在，请核实!");
		}
		String bss_org_path = data.getString("bss_org_path");

		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("bss_org_path", bss_org_path);
		data = this.selectOne("sys.bssorg.selectBssOrgUser", param);
		if (data.getInteger("count") > 0) {
			throw new BusinessException("当前机构或其下属机构下存在用户信息，请核实!");
		}

		// 删除，根据path删除
		param.clear();
		param.put("bss_org_path", bss_org_path);
		this.update("sys.bssorg.delBssOrg", param);

		return ResultUtil.resultSuccess("删除机构信息成功!");
	}

}
