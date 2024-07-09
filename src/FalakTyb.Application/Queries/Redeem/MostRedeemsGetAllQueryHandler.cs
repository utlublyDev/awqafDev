
using awqaf.Domain;
using awqaf.Dto;
using awqaf.Domain.Repositories.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
//import List 
using System.Collections.Generic;
namespace awqaf.Application.Queries
{
    public class MostRedeemsGetAllQueryHandler : IRequestHandler<MostRedeemsGetAllQuery, IEnumerable<MostRedeem>>
    {
        private IReadOnlyRedeemRepository _redeemRepository;
         private IReadOnlyProvidersRepository _providersRepository;

        public MostRedeemsGetAllQueryHandler(
            IReadOnlyRedeemRepository redeemRepository,IReadOnlyProvidersRepository providersRepository)
        {
            _redeemRepository = redeemRepository;
            _providersRepository = providersRepository;
        }

        public async Task<IEnumerable<MostRedeem>> Handle(MostRedeemsGetAllQuery request, CancellationToken cancellationToken)

        {
  List<MostRedeem>  MostRedeemList = new List<MostRedeem>();



          var page = await _providersRepository.QueryHelper().GetPageAsync(request.Page);


            foreach (var item in page.Content)
            {
                var page2 = await _redeemRepository.QueryHelper().Filter(x => x.ProviderId == item.Id).GetPageAsync(request.Page);
                var Count = page2.TotalElements;
                MostRedeem MostRedeemItem = new MostRedeem(item.ProviderNameInArabic,Count,item.ProviderImageUrl);
                MostRedeemList.Add(MostRedeemItem);
            }
//sort the list by count 
            MostRedeemList.Sort((x, y) => y.Count.CompareTo(x.Count));
       
            return MostRedeemList;
        }
    }
}
