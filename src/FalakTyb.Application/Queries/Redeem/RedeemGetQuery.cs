
using awqaf.Domain;
using awqaf.Dto;
using MediatR;

namespace awqaf.Application.Queries
{
    public class RedeemGetQuery : IRequest<Redeem>
    {
        public long Id { get; set; }
    }
}
