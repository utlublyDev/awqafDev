
using JHipsterNet.Core.Pagination;
//import IEnumerable
using System.Collections.Generic;
using System.Threading.Tasks;

namespace awqaf.Domain.Repositories.Interfaces
{

    public interface IReadOnlyOffersRepository : IReadOnlyGenericRepository<Offers, long>
    {

                 public Task<IEnumerable<Offers>> getAllOffersByProviderId(string ProviderId);
                  public Task<IEnumerable<Offers>> getAllOffersByCategoryId(long categoryId,long providerId);
                public Task<IEnumerable<Offers>> SearchOffersByName(string Words);
                 public Task<IEnumerable<Offers>> SearchOffersRange(int MinInput, int MaxInput);



    }

}
